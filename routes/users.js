const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, getUserId, createUser } = require('../controllers/users');

userRouter.get('/', getUser);

userRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), getUserId);

userRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().pattern(new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/)),
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(new RegExp(/[0-9a-zA-Z!]{8,}/)).min(8),
  }),
}), createUser);

module.exports = userRouter;
