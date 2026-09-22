function onUnhandledRejection(err) {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
}

module.exports = { onUnhandledRejection };
