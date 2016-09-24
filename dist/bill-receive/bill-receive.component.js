'use strict';

window.billReceiveComponent = Vue.extend({
    components: {
        'receive-menu-component': billReceiveMenuComponent
    },
    template: '\n        <div class="container">\n            <div class="row">\n                <div class="col-md-12">\n                    <h1 class="text-primary">\n                        {{ title }}\n                        <br>\n                        <small :class="{\'text-default\': status === false, \'text-success\': status === 0, \'text-danger\': status > 0}">\n                            {{ status | statusContasRecebidas }}\n                        </small>\n                    </h1>\n                    <br>\n                    <h3>{{ total | numberFormat \'pt-BR\' \'BRL\' }}</h3>\n                    <br>\n                    <receive-menu-component></receive-menu-component>\n                    <hr>\n                    <router-view></router-view>\n                </div>\n            </div>\n        </div>\n    ',
    data: function data() {
        return {
            title: "Contas a Receber",
            status: false,
            total: 0
        };
    },
    created: function created() {
        this.updateStatus();
        this.updateTotal();
    },

    methods: {
        calculateStatus: function calculateStatus(bills) {
            if (!bills.length) {
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
        updateStatus: function updateStatus() {
            var _this = this;

            BillReceive.query().then(function (response) {
                _this.calculateStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var _this2 = this;

            BillReceive.total().then(function (response) {
                _this2.total = response.data.total;
            });
        }
    },
    events: {
        'change-info': function changeInfo() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});