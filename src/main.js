import Vue from 'vue';
import store from './store/store';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';
import Request from './api/request';
import api from './api/apiUrl';
import axios from 'axios'
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(Request);

//暂时关闭警告
Vue.config.silent=true

axios.defaults.withCredentials = true

Vue.prototype.$axios = axios
Vue.prototype.$api = api

Vue.http.options.emulateJSON = true;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
