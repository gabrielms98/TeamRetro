import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import comments from './modules/comments';
import retros from './modules/retros';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    comments,
    retros
  }
})
