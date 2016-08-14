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
        bills: []
    },

    ready: function() {
        this.bills = this.getItems();
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
        getItems: function() {
            this.$http.get('items.json', function(data){
                this.bills = data;
            });
        },
        showView: function (id) {
            this.activedView = id;
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            };
            if (id == 1) {
                this.formType = 'insert';
            }
        },
        submit: function () {
            console.log(this.bill);

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
            this.activedView = 1;
            this.formType = 'update';
/*
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
*/
        },
        destroyBill: function (index) {
            if (confirm("Deseja realmente excluir a conta?")) {
                this.bills.splice(index,1);
                this.activedView = 0;
            }
        }
    }

});

// Filtro personalizado para a coluna CONTA PAGA
Vue.filter('doneLabel', function (value) {
    if (value == 1) {
        return "Paga";
    }
    return "Não paga";
});