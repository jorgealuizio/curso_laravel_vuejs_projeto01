'use strict';

var namesPay = ['Conta de luz', 'Conta de água', 'Conta de telefone', 'Supermercado', 'Cartão de crédito', 'Empréstimo', 'Gasolina'];

window.billPayCreateComponent = Vue.extend({
    template: '\n        <h3>{{ formType == "insert" ? "Incluir Conta a Pagar" : "Editar Conta a Pagar" }}</h3>\n        <br>\n        <form name="form" @submit.prevent="submit">\n            <div class="form-group">\n                <label>Vencimento:</label>\n                <input type="text" class="form-control" v-model="bill.date_due | dateFormat \'pt-BR\'"/>\n            </div>\n            <div class="form-group">\n                <label>Nome:</label>\n                <select class="form-control" v-model="bill.name">\n                    <option v-for="obj in names" :value="obj">{{ obj | textCaseFormat }}</option>\n                </select>\n            </div>\n            <div class="form-group">\n                <label>Valor:</label>\n                <input type="text" class="form-control" v-model="bill.value | numberFormat \'pt-BR\' \'BRL\'"/>\n            </div>\n            <legend>Conta Paga?</legend>\n            <label class="radio-inline">\n                <input type="radio" id="0" v-model="bill.done" value=0> Não\n            </label>\n            <label class="radio-inline">\n                <input type="radio" id="1" v-model="bill.done" value=1> Sim\n            </label>\n            <hr>\n            <div class="form-group">\n                <input type="submit" class="btn btn-primary" value="Salvar"/>\n            </div>\n        </form>\n    ',
    data: function data() {
        return {
            names: namesPay,
            formType: 'insert',
            bill: new ClassBill()
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },

    methods: {
        submit: function submit() {
            var _this = this;

            var data = this.bill.toJSON();
            if (this.formType == 'insert') {
                BillPay.save({}, data).then(function (response) {
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            } else {
                BillPay.update({ id: this.bill.id }, data).then(function (response) {
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this2 = this;

            BillPay.get({ id: id }).then(function (response) {
                _this2.bill = new ClassBill(response.data);
            });
        },
        getDateDue: function getDateDue(date_due) {
            var dateDueObject = date_due;
            if (!(date_due instanceof Date)) {
                dateDueObject = new Date(dateDueObject.split('/').reverse().join('-') + "T03:00:00");
            }
            //return dateDueObject.toISOString().split('T')[0];
            return dateDueObject.substring(0, 10);
        }
    }
});