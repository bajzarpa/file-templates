const component = name => `import template from './template.html';
import './style.scss';

// @vue/component
const ${name} = {
  template
};

export default ${name};
`

const styles = name => `.${name} {}`

const template = name => `<section class="${name}"></section>`

module.exports = {
  component, styles, template
}
