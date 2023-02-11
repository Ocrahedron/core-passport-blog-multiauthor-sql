const bcrypt = require('bcrypt');
const render = require('../utils/render');
const { User } = require('../../db/models');
const Login = require('../views/entries/Login');
const Error = require('../views/Error');

exports.loginController = async (req, res) => {
  try {
    render(Login, {}, res);
  } catch (error) {
    render(Error, {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    }, res);
  }
};

exports.enterLogin = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ where: { name } });

    if (!user) {
      return render(Error, {
        message: 'Не удалось получить записи из базы данных.',
        error: {},
      }, res);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return render(Error, {
        message: 'Не удалось получить записи из базы данных.',
        error: {},
      }, res);
    }
    req.session.user = { id: user.id, name: user.name }; // создай куку и запиши в БД session storage
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
