function healthCheck(req, res) {
  res.status(200).json({ success: true, message: "OK" });
}

module.exports = { healthCheck };
