import Vue from 'vue';

import moment from 'moment'

Vue.filter('timeFormate', function(arg){
    return moment().format('MMM Do YYYY');
});
