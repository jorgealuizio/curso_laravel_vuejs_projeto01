"use strict";

window.dashboardComponent = Vue.extend({
    template: "\n        <div class=\"container\">\n            <div class=\"jumbotron\">\n                <h1 align=\"center\">Gestão de Contas</h1>\n                <hr>\n                <br>\n                <h2 class=\"text-primary\" align=\"center\">Saldo total atual entre Contas à Receber e Contas à Pagar:</h2>\n                <br>\n                <h2 align=\"center\" :class=\"{'text-success': saldo >= 0, 'text-danger': saldo < 0}\">\n                    {{ saldo | numberFormat 'pt-BR' 'BRL' }}\n                </h2>\n            </div>\n        </div>\n    ",
    data: function data() {
        return {
            saldo: 0
        };
    },
    created: function created() {
        this.updateSaldo();
    },

    methods: {
        updateSaldo: function updateSaldo() {
            var _this = this;

            BillSaldo.query().then(function (response) {
                _this.saldo = response.data.saldo;
            });
        }
    }
});