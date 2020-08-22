import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api';

import App from './App.vue'
import router from './router'
import store from './store'
import hooks from '@u3u/vue-hooks';

Vue.config.productionTip = false

Vue.use(VueCompositionApi);
Vue.use(hooks);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
