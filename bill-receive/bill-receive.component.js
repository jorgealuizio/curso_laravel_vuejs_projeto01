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
                    <h3>{{ total | currency 'R$ ' }}</h3>
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
            title: "Contas a Receber",
            status: false,
            total: 0
        };
    },
    created: function () {
        this.updateStatus();
        this.updateTotal();
    },
    methods: {
        calculateStatus: function (bills) {
            if(!bills.length) {
                this.status = false;
            }
            var count = 0;
            for (var i in bills) {
                if (bills[i].done == 0) {
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus: function () {
            var self = this;
            BillReceive.query().then(function (response) {
                self.calculateStatus(response.data);
            });
        },
        updateTotal: function () {
            var self = this;
            BillReceive.total().then(function (response) {
                self.total = response.data.total;
            });
        }
    },
    events: {
        'change-info': function () {
            this.updateStatus();
            this.updateTotal();
        }
    }
});