window.billReceiveComponent = Vue.extend({
    components: {
        'receive-menu-component': billReceiveMenuComponent
    },
    template: `
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h1 class="text-primary">
                        {{ title }}
                        <br>
                        <small :class="{'text-default': status === false, 'text-success': status === 0, 'text-danger': status > 0}">
                            {{ status | statusContasRecebidas }}
                        </small>
                    </h1>
                    <br>
                    <receive-menu-component></receive-menu-component>
                    <hr>
                    <router-view></router-view>
                </div>
            </div>
        </div>
    `,
    data: function(){
        return {
            title: "Contas a Receber"
        };
    },
    computed: {
        status: function (){
            var bills = this.$root.$children[0].billsReceive;
            if(!bills.length) {
                return false;
            }
            var count = 0;
            for (var i in bills) {
                if (bills[i].done == 0) {
                    count++;
                }
            }
            return count;
        }
    }
});