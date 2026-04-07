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

  // Color intensity based on study duration
  const getColor = (minutes) => {
    if (minutes === 0) return '#e5e7eb';
    if (minutes < 30) return '#bfdbfe';
    if (minutes < 60) return '#60a5fa';
    if (minutes < 120) return '#3b82f6';
    return '#1d4ed8';
  };

  // Group into weeks for grid display
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="heatmap-container">
      <div className="heatmap-grid">
        {weeks.map((week, wi) => (
          <div key={wi} className="heatmap-week">
            {week.map((day, di) => (
              <div
                key={di}
                className="heatmap-cell"
                style={{ backgroundColor: getColor(day.minutes) }}
                title={`${day.date}: ${Math.round(day.minutes / 60 * 10) / 10}h studied`}
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
    </div>
  );
};

export default Heatmap;