const render = require('../utils/render');
const { Entry } = require('../../db/models');
const EntriesList = require('../views/entries/EntriesList');
const NewEntry = require('../views/entries/NewEntry');
const ShowEntry = require('../views/entries/ShowEntry');
const UserList = require('../views/entries/UserList');
const Error = require('../views/Error');
const EditEntry = require('../views/entries/EditEntry');
const { User } = require('../../db/models');

exports.entryFindAllController = async (req, res) => {
  try {
    const entries = await Entry.findAll({ order: [['id', 'DESC']], include: { model: User } });
    render(EntriesList, { entries }, res);
  } catch (error) {
    console.log(error);
    render(Error, {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    }, res);
  }
};

exports.entryAddController = async (req, res) => {
  try {
    const newEntry = await Entry.create({
      title: req.body.title,
      body: req.body.body,
      userID: req.session.user.id,
    }, {
      returning: true,
      plain: true,
    });
    res.redirect(`/entries/${newEntry.id}`);
  } catch (error) {
    render(Error, {
      message: 'Не удалось добавить запись в базу данных.',
      error: {},
    }, res);
  }
};

exports.entryButtonController = async (req, res) => {
  render(NewEntry, {}, res);
};

exports.entryShowNewBlockController = async (req, res) => {
  try {
    const entry = await Entry.findOne({ where: { id: req.params.id }, include: { model: User } });
    render(ShowEntry, { entry }, res);
  } catch (error) {
    render(Error, {
      message: 'Не удалось получить запись из базы данных.',
      error: {},
    }, res);
  }
};

exports.entryEditFetchController = async (req, res) => {
  const idFromBD = await Entry.findOne({ where: { id: req.params.id } });
  if (idFromBD.userID === req.session.user.id) {
    try {
      const entry = await Entry.update({
        title: req.body.title,
        body: req.body.body,
      }, {
        where: { id: req.params.id },
        returning: true,
        plain: true,
      });

      res.json({ isUpdateSuccessful: true, entryID: entry[1].id });
    } catch (error) {
      res.json({
        isUpdateSuccessful: false,
        errorMessage: 'Не удалось обновить запись в базе данных.',
      });
    }
  } else {
    res.json({
      isUpdateSuccessful: false,
      errorMessage: 'Не удалось обновить запись в базе данных.',
    });
  }
};

exports.entryDeleteFetchController = async (req, res) => {
  const idFromBD = await Entry.findOne({ where: { id: req.params.id } });
  if (idFromBD.userID === req.session.user.id) {
    try {
      await Entry.destroy({ where: { id: req.params.id } });
      res.json({ isDeleteSuccessful: true });
    } catch (error) {
      res.json({
        isDeleteSuccessful: false,
        errorMessage: 'Не удалось удалить запись из базы данных.',
      });
    }
  } else {
    res.json({
      isUpdateSuccessful: false,
      errorMessage: 'Не удалось обновить запись в базе данных.',
    });
  }
};

exports.entryEditController = async (req, res) => {
  const entry = await Entry.findOne({ where: { id: req.params.id } });
  render(EditEntry, { entry }, res);
};

exports.entryAllBlocksByUser = async (req, res) => {
  const allUsers = await User.findAll();
  const allUsersId = allUsers.map((el) => el.id);
  console.log(req.params.id);

  if (allUsersId.includes(req.params.id)) {
    try {
      const entries = await Entry.findAll({ where: { userID: req.params.id }, order: [['id', 'DESC']], include: { model: User } });
      render(UserList, { entries }, res);
    } catch (error) {
      console.log(error);
      render(Error, {
        message: 'Нет такого users.',
        error: {},
      }, res);
    }
  } else {
    res.json({
      isUpdateSuccessful: false,
      errorMessage: 'Нет такого users ++',
    });
  }
};
