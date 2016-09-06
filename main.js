var router = new VueRouter();

var mainComponent = Vue.extend({
    components: {
        'bill-component': billComponent
    },
    template: '<bill-component></bill-component>',
    data: function () {
        return {
            billsPay: [
                {date_due: '20/08/2016', name: 'Conta de luz', value: 70.99, done: 1},
                {date_due: '21/08/2016', name: 'Conta de água', value: 50.99, done: 1},
                {date_due: '22/08/2016', name: 'Conta de telefone', value: 55.99, done: 0},
                {date_due: '23/08/2016', name: 'Supermercado', value: 625.99, done: 0},
                {date_due: '24/08/2016', name: 'Cartão de crédito', value: 1500.99, done: 1},
                {date_due: '25/08/2016', name: 'Empréstimo', value: 2000.99, done: 0},
                {date_due: '26/08/2016', name: 'Gasolina', value: 200, done: 0}
            ],
            billsReceive: [
                {date_due: '20/08/2016', name: 'Suporte Técnico', value: 70.99, done: 1},
                {date_due: '21/08/2016', name: 'Treinamento', value: 50.99, done: 1},
                {date_due: '22/08/2016', name: 'Treinamento', value: 55.99, done: 0},
                {date_due: '23/08/2016', name: 'Consultoria', value: 625.99, done: 0},
                {date_due: '24/08/2016', name: 'Sistema', value: 1500.99, done: 1},
                {date_due: '25/08/2016', name: 'Site', value: 2000.99, done: 0},
                {date_due: '26/08/2016', name: 'Consultoria', value: 200, done: 0}
            ]
        };
    }
});

router.map({
    '/bill-pays': {
        component: billPayComponent,
        subRoutes: {
            '/': {
                name: 'bill-pay.list',
                component: billPayListComponent
            },
            '/create': {
                name: 'bill-pay.create',
                component: billPayCreateComponent
            },
            '/:index/update': {
                name: 'bill-pay.update',
                component: billPayCreateComponent
            },
        }
    },
    '/bill-receives': {
        component: billReceiveComponent,
        subRoutes: {
            '/': {
                name: 'bill-receive.list',
                component: billReceiveListComponent
            },
            '/create': {
                name: 'bill-receive.create',
                component: billReceiveCreateComponent
            },
            '/:index/update': {
                name: 'bill-receive.update',
                component: billReceiveCreateComponent
            },
        }
    },
    '*': {
        component: billPayListComponent
    }
});

router.start({
    components: {
        'main-component': mainComponent
    }
}, '#app');

router.redirect({
    '*': '/bill-pays/'
});