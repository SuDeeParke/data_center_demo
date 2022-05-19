import Vue from 'vue';
import {
  Button, Switch, Slider, Radio, RadioGroup,
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/styles/iconfont.css';
import App from './App.vue';
import router from './router';
import store from './store/index';

Vue.prototype.$store = store;

Vue.config.productionTip = false;
Vue.use(RadioGroup);
Vue.use(Button);
Vue.use(Radio);
Vue.use(Switch);
Vue.use(Slider);
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
