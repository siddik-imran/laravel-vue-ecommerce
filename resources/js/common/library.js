import Vue from 'vue'

// element ui support
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { locale })

//moment filter support
import filter from './filter'
