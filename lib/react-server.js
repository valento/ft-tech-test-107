// derived from @financial-times/dotcom-server-react-jsx
const { createElement } = require('react');
const { renderToString } = require('react-dom/server');

const interopRequire = (path) => {
	const obj = require(path);
	return obj && obj.__esModule ? obj['default'] : obj;
}

const render = async (component, templateContext) => {
  if (typeof component.getInitialProps === 'function') {
    templateContext = await component.getInitialProps(templateContext);
  }
  const outputHTML = renderToString(createElement(component, templateContext));
  return outputHTML;
}

const renderView = async (viewPath, templateContext, callback) => {
  try {
    const element = interopRequire(viewPath);
    if (typeof element !== 'function') {
      throw Error(`The module ${viewPath} requires a default export.`);
    }
    const output = await render(element, templateContext);
    callback(null, output);
  } catch (error) {
    callback(error);
  }
}

module.exports = renderView;
