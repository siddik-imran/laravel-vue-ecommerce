
require('./bootstrap');

window.Vue = require('vue');
import router from './admin/router'
import {store} from './common/store/store'

// element ui support
import library from './common/library'

Vue.component('admin-master', require('./components/admin/AdminMaster.vue').default);

// vue instance
const admin = new Vue({
    el: '#admin',
    router,
    store,
    data:{
        test: 'testing for admin'
    }
});


