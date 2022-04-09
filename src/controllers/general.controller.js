const httpStatus = require('http-status');

const test = (req, res) => {
  res.status(httpStatus.OK).send('La API está funcionando');
};

module.exports = {
  test,
};
