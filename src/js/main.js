
import "popper.js";
import "bootstrap";

import Vue from 'vue'
import App from '../js/App'
import jQuery from 'jquery'


window.jQuery = jQuery
window.$ = jQuery

window.vm = new Vue({
    el: '#app',
    render: h => h(App)
  })

 