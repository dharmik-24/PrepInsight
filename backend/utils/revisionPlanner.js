const DEFAULT_TOP_N = 10;
const MAX_TOP_N = 50;

const DEFAULT_SUBJECT_WEIGHTS = {
  Mathematics: 1.0,
  Algorithms: 0.95,
  'Data Structures': 0.9,
  DBMS: 0.85,
  'Operating Systems': 0.85,
  'Computer Networks': 0.8,
  TOC: 0.75,
  'Compiler Design': 0.7,
  'Digital Logic': 0.65,
  'General Aptitude': 0.6
};

const STATUS_SCORES = {
  pending: 1,
  'in-progress': 0.7,
  completed: 0.4
};

const DEFAULT_WEIGHTS = {
  status: 0.24,
  recency: 0.2,
  weakness: 0.28,
  subject: 0.1,
  due: 0.18,
  interaction: 0.08
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const daysBetween = (from, to) => {
  if (!from) return null;
  const ms = to.getTime() - new Date(from).getTime();
  return clamp(ms / (1000 * 60 * 60 * 24), 0, 3650);
};

const median = (values) => {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
};

const percentileRank = (value, values) => {
  if (!values.length) return 0.5;
  const sorted = [...values].sort((a, b) => a - b);
  let count = 0;
  for (const n of sorted) {
    if (n <= value) count += 1;
  }
  return clamp(count / sorted.length, 0, 1);
};

const normalizeSubjectWeights = (subjectWeights) => {
  const entries = Object.entries(subjectWeights);
  if (!entries.length) return {};

  const vals = entries.map(([, w]) => w);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = Math.max(0.0001, max - min);

  return entries.reduce((acc, [subject, weight]) => {
    acc[subject] = clamp((weight - min) / range, 0, 1);
    return acc;
  }, {});
};

const buildStats = (topics, now) => {
  const recencyDays = [];
  const accuracyValues = [];
  const revisionCounts = [];

  for (const t of topics) {
    const days = daysBetween(t.lastStudied, now);
    if (days !== null) recencyDays.push(days);
    if (typeof t.accuracy === 'number') accuracyValues.push(clamp(t.accuracy, 0, 100));
    revisionCounts.push(Math.max(0, t.revisionCount || 0));
  }

  return {
    recencyDays,
    accuracyValues,
    revisionCounts,
    medianRecency: median(recencyDays),
    medianRevisionCount: median(revisionCounts)
  };
};

const computeWeakness = (topic, stats) => {
  const accuracy = typeof topic.accuracy === 'number' ? clamp(topic.accuracy, 0, 100) : null;
  const accWeak = accuracy === null
    ? 0.55
    : 1 - percentileRank(accuracy, stats.accuracyValues.length ? stats.accuracyValues : [accuracy]);

  const totalAttempts = Math.max(0, topic.totalAttempts || 0);
  const incorrectAttempts = Math.max(0, topic.incorrectAttempts || 0);
  const errWeak = totalAttempts > 0 ? clamp(incorrectAttempts / totalAttempts, 0, 1) : 0.5;

  const weak = 0.65 * accWeak + 0.35 * errWeak;
  return clamp(weak, 0, 1);
};

const computeRecency = (topic, stats, now) => {
  const days = daysBetween(topic.lastStudied, now);
  if (days === null) {
    // Never studied: high urgency but not absolute max.
    return {
      recencyDays: stats.medianRecency > 0 ? stats.medianRecency * 1.75 : 7,
      recencyScore: 0.9,
      neverStudied: true
    };
  }

  return {
    recencyDays: days,
    recencyScore: percentileRank(days, stats.recencyDays.length ? stats.recencyDays : [days]),
    neverStudied: false
  };
};

const computeExpectedGap = (topic, weakness, stats) => {
  const revisionCount = Math.max(0, topic.revisionCount || 0);
  const adaptiveBase = clamp(Math.round((stats.medianRecency || 6) * 0.8), 2, 14);
  const growthRate = 1.8;
  const minGap = 1;
  const maxGap = 120;
  const baseGap = adaptiveBase * Math.pow(growthRate, revisionCount);
  const difficultyFactor = 1 - 0.55 * weakness;
  return clamp(baseGap * difficultyFactor, minGap, maxGap);
};

const isEligible = (topic, dueRatio, recencyScore) => {
  if (topic.status !== 'completed') return true;
  return dueRatio >= 1 || recencyScore >= 0.8;
};

const scoreTopic = ({
  topic,
  recencyScore,
  weaknessScore,
  dueScore,
  subjectScore
}) => {
  const statusScore = STATUS_SCORES[topic.status] ?? 0.5;
  const scoreBreakdown = [
    { label: 'Status', value: DEFAULT_WEIGHTS.status * statusScore },
    { label: 'Recency', value: DEFAULT_WEIGHTS.recency * recencyScore },
    { label: 'Weakness', value: DEFAULT_WEIGHTS.weakness * weaknessScore },
    { label: 'Subject', value: DEFAULT_WEIGHTS.subject * subjectScore },
    { label: 'Due', value: DEFAULT_WEIGHTS.due * dueScore },
    { label: 'Interaction', value: DEFAULT_WEIGHTS.interaction * (weaknessScore * dueScore) }
  ];

  const score = scoreBreakdown.reduce((sum, item) => sum + item.value, 0);

  return {
    score,
    statusScore,
    scoreBreakdown
  };
};

const buildExplanation = (features) => {
  const {
    topic,
    statusScore,
    recencyScore,
    weaknessScore,
    subjectScore,
    dueRatio,
    dueScore,
    recencyDays,
    expectedGap,
    subjectWeightRaw,
    scoreBreakdown
  } = features;

  const reasonByLabel = {
    Status: topic.status === 'pending'
      ? 'pending status'
      : topic.status === 'in-progress'
        ? 'in-progress status'
        : 'completed topic due again',
    Recency: recencyScore >= 0.75 ? 'not studied recently' : 'study gap rising',
    Weakness: weaknessScore >= 0.65 ? 'low accuracy / higher mistakes' : 'retention needs reinforcement',
    Subject: subjectScore >= 0.7 ? 'high exam-weight subject' : 'subject relevance',
    Due: dueRatio >= 1 ? 'overdue for spaced revision' : 'approaching due revision window',
    Interaction: dueScore >= 0.55 && weaknessScore >= 0.55
      ? 'weak topic is due now'
      : 'weakness and due-ness combination'
  };

  const contributions = scoreBreakdown
    .map((item) => ({
      value: item.value,
      reason: reasonByLabel[item.label] || item.label
    }))
    .sort((a, b) => b.value - a.value);

  const topReasons = contributions.slice(0, 3).map((c) => c.reason);
  const dueMeta = topic.lastStudied
    ? `${Math.round(recencyDays)}d elapsed vs expected ${Math.round(expectedGap)}d gap`
    : 'never studied yet';

  return `High priority because ${topReasons.join(', ')}. Due context: ${dueMeta}. Subject weight: ${subjectWeightRaw.toFixed(2)}.`;
};

const diversify = (rankedTopics, N, normalizedWeights) => {
  if (!rankedTopics.length) return [];

  const subjects = [...new Set(rankedTopics.map((item) => item.subject))];
  const minPerSubject = subjects.reduce((acc, subject) => {
    const hasVeryHigh = rankedTopics.some(
      (item) => item.subject === subject && (item.priority >= 0.72 || item.dueRatio >= 1.4)
    );
    acc[subject] = hasVeryHigh ? 1 : 0;
    return acc;
  }, {});

  const weights = subjects.reduce((acc, subject) => {
    acc[subject] = normalizedWeights[subject] ?? 0.5;
    return acc;
  }, {});

  const totalWeight = subjects.reduce((sum, s) => sum + weights[s], 0) || subjects.length;
  const softQuota = subjects.reduce((acc, subject) => {
    const quota = Math.floor((weights[subject] / totalWeight) * N);
    acc[subject] = Math.max(minPerSubject[subject], quota);
    return acc;
  }, {});

  const bySubject = subjects.reduce((acc, subject) => {
    acc[subject] = rankedTopics.filter((item) => item.subject === subject);
    return acc;
  }, {});

  const selected = [];
  const usedIds = new Set();

  // Pass 1: fill soft quotas.
  for (const subject of subjects) {
    for (let i = 0; i < softQuota[subject] && selected.length < N; i += 1) {
      const next = bySubject[subject].find((item) => !usedIds.has(String(item._id)));
      if (!next) break;
      selected.push(next);
      usedIds.add(String(next._id));
    }
  }

  // Pass 2: fill remaining slots with global best.
  for (const item of rankedTopics) {
    if (selected.length >= N) break;
    const id = String(item._id);
    if (!usedIds.has(id)) {
      selected.push(item);
      usedIds.add(id);
    }
  }

  return selected;
};

const generateRevisionPlan = ({ topics, topN = DEFAULT_TOP_N, subjectWeights, now = new Date() }) => {
  const N = clamp(Number(topN) || DEFAULT_TOP_N, 1, MAX_TOP_N);
  if (!Array.isArray(topics) || topics.length === 0) return [];

  const effectiveSubjectWeights = { ...DEFAULT_SUBJECT_WEIGHTS, ...(subjectWeights || {}) };
  const normalizedSubjectWeights = normalizeSubjectWeights(effectiveSubjectWeights);
  const stats = buildStats(topics, now);

  const scored = [];
  for (const topic of topics) {
    const recency = computeRecency(topic, stats, now);
    const weaknessScore = computeWeakness(topic, stats);
    const expectedGap = computeExpectedGap(topic, weaknessScore, stats);
    const dueRatio = recency.recencyDays / Math.max(1, expectedGap);
    const dueScore = clamp(1 / (1 + Math.exp(-3 * (dueRatio - 1))), 0, 1);
    const subjectWeightRaw = effectiveSubjectWeights[topic.subject] ?? 0.55;
    const subjectScore = normalizedSubjectWeights[topic.subject] ?? 0.5;

    if (!isEligible(topic, dueRatio, recency.recencyScore)) {
      continue;
    }

    const { score, statusScore, scoreBreakdown } = scoreTopic({
      topic,
      recencyScore: recency.recencyScore,
      weaknessScore,
      dueScore,
      subjectScore
    });

    scored.push({
      ...topic.toObject(),
      priority: Number(score.toFixed(4)),
      dueRatio: Number(dueRatio.toFixed(2)),
      expectedGapDays: Number(expectedGap.toFixed(1)),
      weaknessScore: Number(weaknessScore.toFixed(3)),
      scoreBreakdown: scoreBreakdown
        .map((item) => ({
          label: item.label,
          value: Number(item.value.toFixed(4))
        }))
        .sort((a, b) => b.value - a.value),
      explanation: buildExplanation({
        topic,
        statusScore,
        recencyScore: recency.recencyScore,
        weaknessScore,
        subjectScore,
        dueRatio,
        dueScore,
        recencyDays: recency.recencyDays,
        expectedGap,
        subjectWeightRaw,
        scoreBreakdown
      })
    });
  }

  const ranked = scored.sort((a, b) => b.priority - a.priority);
  return diversify(ranked, N, normalizedSubjectWeights);
};

module.exports = {
  generateRevisionPlan
};
