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
    avatar: Joi.string().required().pattern(new RegExp(/^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=\\/?]|%[0-9a-fA-F]{2})*)?(\\#([a-zA-Z0-9$\-_.+!*'(),;:@&=\\/?]|%[0-9a-fA-F]{2})*)?)?$/)),
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(new RegExp(/[0-9a-zA-Z!]{8,}/)).min(8),
  }),
}), createUser);

module.exports = userRouter;
