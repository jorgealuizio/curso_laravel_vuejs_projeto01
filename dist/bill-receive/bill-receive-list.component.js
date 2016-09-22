"use strict";

window.billReceiveListComponent = Vue.extend({
    template: "\n        <table class=\"table table-hover\">\n            <thead>\n            <tr class=\"text-primary\">\n                <th>#</th>\n                <th>Vencimento</th>\n                <th>Nome</th>\n                <th>Valor</th>\n                <th>Recebida?</th>\n                <th>Ações</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr v-for=\"(index, o) in bills\">\n                <td>{{ index + 1 }}</td>\n                <td>{{ o.date_due | dateFormat }}</td>\n                <td>{{ o.name }}</td>\n                <td>{{ o.value | numberFormat }}</td>\n                <td style=\"font-weight: bold\" :class=\"{'text-success': o.done==1, 'text-danger': o.done==0}\">\n                    {{ o.done | doneLabelRecebidas }}\n                </td>\n                <td>\n                    <a v-link=\"{ name: 'bill-receive.update', params: { id: o.id } }\" class=\"btn btn-primary btn-xs\">Editar</a>\n                    <a href=\"#\" class=\"btn btn-danger btn-xs\" @click.prevent=\"destroyBill(o)\">Excluir</a>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n    ",
    data: function data() {
        return {
            bills: []
        };
    },
    created: function created() {
        var _this = this;

        BillReceive.query().then(function (response) {
            _this.bills = response.data;
        });
    },

    methods: {
        destroyBill: function destroyBill(bill) {
            var _this2 = this;

            if (confirm("Deseja realmente excluir a conta?")) {
                BillReceive.delete({ id: bill.id }).then(function (response) {
                    _this2.bills.$remove(bill);
                    _this2.$dispatch('change-info');
                });
            }
        }
    }
});