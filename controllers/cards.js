const Cards = require('../models/card');

const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbidden');

module.exports.getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((cards) => res.json({ data: cards }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new NotFoundError('карточка не найдена');
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Cards.findById(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        card.remove();
        res.send(card);
      } else next(new ForbiddenError('Попытка удалить чужую карточку'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else if (err.message === 'Not found') {
        next(new NotFoundError('Объект не найден'));
      }
    })
    .catch(next);
};
