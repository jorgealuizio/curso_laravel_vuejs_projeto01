window.dashboardComponent = Vue.extend({
    template: `
        <div class="jumbotron">
            <h1>Saldo de Contas</h1>
            <p>...</p>
            <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
        </div>
    `,
    computed: {
        saldo: function (){
            var billsReceive = this.$root.$children[0].billsReceive,
                billsPay = this.$root.$children[0].billsPay;

            // if(!billsReceive.length && !billsPay.length) {
            //     return false;
            // }

            var toalReceive = 0,
                totalPay = 0;
            for (var i in billsReceive) {
                toalReceive += billsReceive[i].value;
            }
            for (var j in billsPay) {
                totalPay += billsPay[j].value;
            }
            return (toalReceive - totalPay);
        }
    }
});