const bcrypt = require('bcrypt');
const render = require('../utils/render');
const { User } = require('../../db/models');
const Register = require('../views/entries/Register');
const Error = require('../views/Error');

exports.registerController = async (req, res) => {
  try {
    render(Register, {}, res);
  } catch (error) {
    render(Error, {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    }, res);
  }
};

exports.createNewUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 3);
    const user = await User.create({ name, password: hashedPassword });
    req.session.user = { id: user.id, name: user.name }; // создай куку  и запиши в БД session storage
    req.session.save(() => {
      res.redirect('/');
    });
  } catch (error) {
    render((Error, {
      message: 'Пользователь с таким логином уже существует, используйте другое имя пользователя',
      error: {},
    }, res));
  }
};
