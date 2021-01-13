const NotFoundError = require('../errors/notFoundError');

module.exports.notFound = (req, res) => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
};
