import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import './bus';
import currencyFilter from './filters/currency'
import VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW.js';
import dateFormat from './filters/dateFormat';
import * as VueGoogleMaps from 'vue2-google-maps'

// 引入 firebase auth
import {auth} from '@/firebase.js'

//引入 ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入 xlsx-style
// import 'xlsx-style/dist/xlsx.full.min.js'
// import 'xlsx-style/dist/xlsx.js'
// import 'xlsx-style/dist/cpexcel.js'
// import 'xlsx-style/xlsx.js'


//使用 ElementUI
Vue.use(ElementUI);

// 引用vue2-google-maps
Vue.use(VueGoogleMaps,{
  load: {
    key: 'AIzaSyCQHaGUe1qQCWdzkZwl4llVcftGlpg1a2Y',
    // key: '',
  }
})

Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_TW', zhTWValidate);
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;
Vue.component('Loading',Loading);
Vue.filter('currency',currencyFilter);
Vue.filter('dateFormat',dateFormat);

//  全局混入
Vue.mixin({
  methods: {
    listFormat (firebaseList) {  // compile firebase list to array
      let newAry = []
      for (let item in firebaseList) {
        newAry.push({
          ...firebaseList[item],
          index: item
        })
      }
      return newAry
    },
  },
})

// 監聽 firebase Observed the user status changing.
auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log('User is signed in.')
    localStorage.userSignin = 'Y'
  } else {
    // User is signed out.
    console.log('User is signed out.')
    localStorage.userSignin = 'N'
  }
});



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to,from,next)=>{
  if(to.meta.requiresAuth){
    setTimeout(() => {
      if(localStorage.userSignin == 'Y'){
        next();
      }else{
        next({
          path: '/login',
        });
      }
    }, 200);
  }else{
    next();
  }
  
});