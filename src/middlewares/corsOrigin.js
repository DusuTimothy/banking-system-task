function corsOrigin(allowedOrigins) {
  return function checkCorsOrigin(origin, callback) {
    // allow non-browser tools (no origin header) and whitelisted origins
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  };
}

module.exports = { corsOrigin };
