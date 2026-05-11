const logger = {
  info: (message, meta = {}) => {
    console.log(JSON.stringify({ level: "info", message, ...meta, at: new Date().toISOString() }));
  },
  warn: (message, meta = {}) => {
    console.warn(JSON.stringify({ level: "warn", message, ...meta, at: new Date().toISOString() }));
  },
  error: (message, meta = {}) => {
    console.error(JSON.stringify({ level: "error", message, ...meta, at: new Date().toISOString() }));
  },
};

module.exports = logger;
