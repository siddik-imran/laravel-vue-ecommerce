
require('./bootstrap');

window.Vue = require('vue');
import router from './public/router'
import {store} from './common/store/store'

// element ui support
import library from './common/library'

Vue.component('public-master', require('./components/public/PublicMaster.vue').default);


const app = new Vue({
    el: '#app',
    router,
    store,
    data:{
        test: 'testing for user/public'
    }
});
