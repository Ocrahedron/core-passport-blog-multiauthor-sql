// const ReactDOMServer = require('react-dom/server');
// const React = require('react');
const router = require('express').Router();

const { registerController, createNewUser } = require('../controllers/registerController');

router
  .route('/')
  .get(registerController)
  .post(createNewUser);

module.exports = router;
