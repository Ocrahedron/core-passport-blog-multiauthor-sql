const ReactDomServer = require('react-dom/server');
const React = require('react');

const render = (reactElement, properties = {}, response) => {
  properties.user = response.locals.user; // добавляем имя пользователя в пропсы, по ключу username, для компонента Layout
  const reactEl = React.createElement(reactElement, properties);
  const html = ReactDomServer.renderToStaticMarkup(reactEl);
  response.write('<!DOCTYPE html>');
  response.write(html);
  response.end();
};

module.exports = render;
