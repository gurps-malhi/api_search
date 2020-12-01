import "popper.js";
import "bootstrap";

import Vue from 'vue'
import App from '../js/App'
import jQuery from 'jquery'
import router from './router'


window.jQuery = jQuery
window.$ = jQuery

window.vm = new Vue({
    router,
    el: '#app',
    render: h => h(App)
  })

 