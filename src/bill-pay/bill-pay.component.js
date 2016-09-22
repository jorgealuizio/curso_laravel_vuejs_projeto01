window.billPayComponent = Vue.extend({
    components: {
        'pay-menu-component': billPayMenuComponent
    },
    template: `
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h1 class="text-primary">
                        {{ title }}
                        <br>
                        <small :class="{'text-default': status === false, 'text-success': status === 0, 'text-danger': status > 0}">
                            {{ status | statusContasPagas }}
                        </small>
                    </h1>
                    <br>
                    <h3>{{ total | numberFormat }}</h3>
                    <br>
                    <pay-menu-component></pay-menu-component>
                    <hr>
                    <router-view></router-view>
                </div>
            </div>
        </div>
    `,
    data(){
        return {
            title: "Contas a Pagar",
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
            for (let i in bills) {
                if (bills[i].done == 0) {
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus() {
            BillPay.query().then((response) => {
                this.calculateStatus(response.data);
            });
        },
        updateTotal() {
            BillPay.total().then((response) => {
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