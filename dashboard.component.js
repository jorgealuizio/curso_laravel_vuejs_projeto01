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
    computed: {
        saldo: function (){
            var billsReceive = this.$root.$children[0].billsReceive,
                billsPay = this.$root.$children[0].billsPay;

            var toalReceive = 0,
                totalPay = 0;

            for (var i in billsReceive) {
                if (billsReceive[i].done == 0) {
                    toalReceive += billsReceive[i].value;
                }
            }
            for (var j in billsPay) {
                if (billsPay[j].done == 0) {
                    totalPay += billsPay[j].value;
                }
            }
            return (toalReceive - totalPay);
        }
    }
});