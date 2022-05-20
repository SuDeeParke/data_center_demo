import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import {
  Button,
  Switch,
  Slider,
  Radio,
  RadioGroup,
  Form,
  FormItem,
  Input,
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
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(VueAxios, axios);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
