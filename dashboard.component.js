window.dashboardComponent = Vue.extend({
    template: `
        <div class="container">
            <div class="jumbotron">
                <h1 align="center">Gestão de Contas</h1>
                <hr>
                <br>
                <h2 class="text-primary" align="center">Saldo total atual entre Contas à Receber e Contas à Pagar:</h2>
                <br>
                <h2 align="center" :class="{'text-success': saldo >= 0, 'text-danger': saldo < 0}">
                    {{ saldo | currency 'R$ ' 2 }}
                </h2>
            </div>
        </div>
    `,
    data: function(){
        return {
            saldo: 0
        };
    },
    created: function () {
        this.updateSaldo();
    },
    methods: {
        updateSaldo: function () {
            var self = this;
            BillSaldo.query().then(function (response) {
                self.saldo = response.data.saldo;
            });
        }
    }
});