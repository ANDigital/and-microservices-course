module.exports = (req, res) => {
  req.log.info("request received");

  res.send({ message: `Hello ${req.params.name}` });
};
