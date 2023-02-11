const render = require('../utils/render');
const Error = require('../views/Error');

exports.logoutController = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) return next(err);
    });
    res.clearCookie('kyk');
    res.redirect('/');
  } catch (error) {
    render(Error, {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    }, res);
  }
};
