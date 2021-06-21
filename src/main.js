// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
Vue.config.productionTip = false

  // request interceptor
  axios.interceptors.request.use(
    config => {
        console.log("sssssssssssssssssssssssss")
        config.headers['Authorization'] = "5epW+DFmx+lBC/orVreIQMIGxuk0yJkOsQ5V0apzWvDwMB5U3xdWNDl79YdAOSnzzl0beKWYx6VBlJHguE/BRIuNfp3LzshY81o7z2JO5Ws="
        config.headers['Cookie'] = "_ga=GA1.1.1882149278.1617154786; token=a2NiX3Rva2VuNjQxNzYxMDEyMzcxMTYxNzE1OTk0Ni42ODU2; UM_distinctid=178a5037ebe9e5-01b792170efd8-c3f3568-232800-178a5037ebf911; CNZZDATA1279773991=665851832-1618970933-null%7C1620804851; CNZZDATA1279773382=918128365-1617671532-%7C1624266026; JSESSIONID=5B3B9A681675E23C71395846038BEE0E"
        return config;
    },
    error => {
        // do something with request error
        return Promise.reject(error);
    }
);

  Vue.prototype.$axios = axios
// use
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
