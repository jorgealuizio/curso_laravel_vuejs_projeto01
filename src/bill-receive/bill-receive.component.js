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
                    <h3>{{ total | numberFormat 'pt-BR' 'BRL' }}</h3>
                    <br>
                    <receive-menu-component></receive-menu-component>
                    <hr>
                    <router-view></router-view>
                </div>
            </div>
        </div>
    `,
    data(){
        return {
            title: "Contas a Receber",
            status: false,
            total: 0
        };
    },
    created() {
        this.updateStatus();
        this.updateTotal();
    },
    methods: {
        calculateStatus(bills) {
            if(!bills.length) {
                this.status = false;
            }
            let count = 0;
            for (var i in bills) {
                if (bills[i].done == 0) {
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus() {
            BillReceive.query().then((response) => {
                this.calculateStatus(response.data);
            });
        },
        updateTotal() {
            BillReceive.total().then((response) => {
                this.total = response.data.total;
            });
        }
    },
    events: {
        'change-info'() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});