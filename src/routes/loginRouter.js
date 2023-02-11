// const ReactDOMServer = require('react-dom/server');
// const React = require('react');
const router = require('express').Router();

const { loginController, enterLogin } = require('../controllers/loginController');

router
  .route('/')
  .get(loginController)
  .post(enterLogin);

module.exports = router;
