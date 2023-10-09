// import * as Vue from 'vue';

// import App from './App.vue';

// let app = Vue.createApp(App);

// console.log('Vue', Vue, app);

// app.mount('#app-vue');

import { createApp } from 'vue';

import App from './App.vue';
// import router from './router';
// import store from './store';

createApp(App)
  // .use(store)
  // .use(router)
  .mount('#app-vue');
