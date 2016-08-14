var app = new Vue({

    el: "#app",

    data: {
        test: '',
        title: "Contas a Pagar",
        menus: [
            {id: 0, name: "Listar contas"},
            {id: 1, name: "Criar conta"}
        ],
        activedView: 1,
        formType: 'insert',
        bill: {
            date_due: '',
            name: '',
            value: 0,
            done: 0
        },
        names: [
            'Conta de luz',
            'Conta de água',
            'Conta de telefone',
            'Supermercado',
            'Cartão de crédito',
            'Empréstimo',
            'Gasolina'
        ],
        bills: [
            {date_due: '20/08/2016', name: 'Conta de luz', value: 70.99, done: 1},
            {date_due: '21/08/2016', name: 'Conta de água', value: 50.99, done: 1},
            {date_due: '22/08/2016', name: 'Conta de telefone', value: 55.99, done: 0},
            {date_due: '23/08/2016', name: 'Supermercado', value: 625.99, done: 0},
            {date_due: '24/08/2016', name: 'Cartão de crédito', value: 1500.99, done: 1},
            {date_due: '25/08/2016', name: 'Empréstimo', value: 2000.99, done: 0},
            {date_due: '26/08/2016', name: 'Gasolina', value: 200, done: 0},
        ]
    },

    computed: {
        status: function () {
            var count = 0;
            var countDone = 0;
            for (var i in this.bills) {
                count++;
                if (!this.bills[i].done) {
                    countDone++;
                }
            }
            if (!count) {
                return {tag: -1, value: "Nenhuma conta cadastrada"};
            }
            return !countDone ? {tag: 0, value: "Nenhuma conta a pagar"} : {tag: 1, value: "Existe(m) " + countDone + " conta(s) a ser(em) paga(s)"};
        }
    },

    methods: {
        showView: function (id) {
            this.activedView = id;
            if (id == 1) {
                this.formType = 'insert';
            }
        },
        submit: function () {
            if (this.formType == 'insert') {
                this.bills.push(this.bill);
            }

            // Limpar o formulário
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            };
            this.activedView = 0;
        },
        loadBill: function (bill) {
            this.bill = bill;
            this.activedView= 1;
            if (this.formType == 'insert') {
                this.bills.push(this.bill);
            }

            // Limpar o formulário
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            };
            this.activedView = 0;

            this.formType = 'update';
        }
    }

});

// Filtro personalizado para a coluna CONTA PAGA
Vue.filter('doneLabel', function (value) {
    if (value == 0) {
        return "Não paga";
    } else {
        return "Paga";
    }
});