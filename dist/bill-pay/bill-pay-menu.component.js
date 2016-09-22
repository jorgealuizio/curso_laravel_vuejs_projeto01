"use strict";

window.billPayMenuComponent = Vue.extend({
    template: "\n        <nav class=\"navbar navbar-default\">\n            <div class=\"collapse navbar-collapse\">\n                <ul class=\"nav navbar-nav\">\n                    <li v-for=\"m in menus\">\n                        <a v-link=\"{ name: m.routeName }\">{{ m.name }}</a>\n                    </li>\n                </ul>\n            </div>\n        </nav>\n    ",
    data: function data() {
        return {
            menus: [{ id: 0, name: "Listar contas", routeName: 'bill-pay.list' }, { id: 1, name: "Criar conta", routeName: 'bill-pay.create' }]
        };
    }
});