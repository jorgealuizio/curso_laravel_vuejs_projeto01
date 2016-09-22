"use strict";

window.billComponent = Vue.extend({
    template: "\n        <nav class=\"navbar navbar-inverse navbar-fixed-top\">\n            <div class=\"navbar-header\">\n                <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n                    <span class=\"sr-only\">Toggle navigation</span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                </button>\n                <a class=\"navbar-brand\" v-link=\"{ name: 'dashboard' }\">Dashboard</a>\n            </div>\n            <div class=\"collapse navbar-collapse\">\n                <ul class=\"nav navbar-nav\">\n                    <li v-for=\"m in menus\">\n                        <a v-link=\"{ name: m.routeName }\">{{ m.name }}</a>\n                    </li>\n                </ul>\n            </div>\n        </nav>\n        <br><br><br>\n        <router-view></router-view>\n    ",
    data: function data() {
        return {
            menus: [{ name: "Contas a pagar", routeName: 'bill-pay.list' }, { name: "Contas a receber", routeName: 'bill-receive.list' }]
        };
    }
});