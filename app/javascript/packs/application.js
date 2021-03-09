// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
require("local-time").start()

window.Rails = Rails

import 'bootstrap'
import 'data-confirm-modal'
import Vue from 'vue/dist/vue.esm'
import App from '../app.vue'

window.store = {}

$(document).on("turbolinks:load", () => {
  $('[data-toggle="tooltip"]').tooltip()
  $('[data-toggle="popover"]').popover()
})

document.addEventListener("turbolinks:load", function() {
    var element = document.querySelector("#boards")
    window.store.lists = JSON.parse(element.dataset.lists)
    if (element != undefined) {
        const app = new Vue({
            el: element,
            data: window.store,
            template: "<App :original_lists='lists' />",
            components: { App }
        })
    }
})
