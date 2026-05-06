// GitHub-style contribution heatmap for study consistency

const Heatmap = ({ data }) => {
  // Build a map of date → minutes
  const dataMap = {};
  data.forEach(d => { dataMap[d._id] = d.minutes; });

  // Generate last 90 days
  const days = [];
  for (let i = 89; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    days.push({ date: key, minutes: dataMap[key] || 0 });
  }

  const toHourLabel = (minutes) => `${(minutes / 60).toFixed(1)}h`;

  // Color intensity based on study hours
  const getColor = (minutes) => {
    if (minutes === 0) return '#e5e7eb';
    if (minutes < 60) return '#bfdbfe';
    if (minutes < 120) return '#60a5fa';
    if (minutes < 240) return '#3b82f6';
    return '#1d4ed8';
  };

  // Study streaks based on non-zero daily study.
  let currentStreak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].minutes > 0) {
      currentStreak += 1;
    } else {
      break;
    }
  }

  let bestStreak = 0;
  let runningStreak = 0;
  days.forEach(day => {
    if (day.minutes > 0) {
      runningStreak += 1;
      if (runningStreak > bestStreak) bestStreak = runningStreak;
    } else {
      runningStreak = 0;
    }
  });

  const totalMinutes = days.reduce((sum, day) => sum + day.minutes, 0);

  // Group into weeks for grid display
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="heatmap-container">
      <div className="heatmap-stats">
        <div className="heatmap-stat">
          <span className="heatmap-stat-label">Current Streak</span>
          <strong>{currentStreak} day{currentStreak === 1 ? '' : 's'}</strong>
        </div>
        <div className="heatmap-stat">
          <span className="heatmap-stat-label">Best Streak</span>
          <strong>{bestStreak} day{bestStreak === 1 ? '' : 's'}</strong>
        </div>
        <div className="heatmap-stat">
          <span className="heatmap-stat-label">Last 90 Days</span>
          <strong>{toHourLabel(totalMinutes)}</strong>
        </div>
      </div>
      <div className="heatmap-grid">
        {weeks.map((week, wi) => (
          <div key={wi} className="heatmap-week">
            {week.map((day, di) => (
              <div
                key={di}
                className="heatmap-cell"
                style={{ backgroundColor: getColor(day.minutes) }}
                title={`${day.date}: ${toHourLabel(day.minutes)} studied`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="heatmap-legend">
        <span>Less</span>
        {['#e5e7eb', '#bfdbfe', '#60a5fa', '#3b82f6', '#1d4ed8'].map((c, i) => (
          <div key={i} style={{ width: 14, height: 14, backgroundColor: c, borderRadius: 2 }} />
        ))}
        <span>More</span>
      </div>
      <p className="heatmap-caption">Intensity scale: 0h, &lt;1h, 1-2h, 2-4h, 4h+</p>
    </div>
  );
};

export default Heatmap;