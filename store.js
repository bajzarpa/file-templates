const index = moduleName => `import { getSessionItem } from '../../../utils/storage';
import mutations from './mutations';
import { getDefaultState } from './internal';

const state = getSessionItem('${moduleName}') || getDefaultState();

const store = {
  state,
  mutations
};

export default store;
`

const getters = moduleName => `import oget from 'object-get';
import curry from '../../../utils/fp/curry';
import prop from '../../../utils/fp/prop';

const ${moduleName}Prop = curry((prop, state) => oget(state.${moduleName}, prop));
`

const internal = () => `export const getDefaultState = () => ({});`

module.exports = {
  index, getters, internal
}
