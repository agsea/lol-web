// 应用程序入口

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import tooltip from './components/util/tooltip';

// 引入插件
Vue.use(tooltip);

// 挂载应用程序
new Vue({
    el: '#app',
    router: router,
    template: '<App/>',
    components: {App}
});
