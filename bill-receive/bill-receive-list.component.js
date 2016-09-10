window.billReceiveListComponent = Vue.extend({
    template: `
        <table class="table table-hover">
            <thead>
            <tr class="text-primary">
                <th>#</th>
                <th>Vencimento</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Recebida?</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(index, o) in bills">
                <td>{{ index + 1 }}</td>
                <td>{{ o.date_due }}</td>
                <td>{{ o.name }}</td>
                <td>{{ o.value | currency 'R$ ' 2 }}</td>
                <td style="font-weight: bold" :class="{'text-success': o.done==1, 'text-danger': o.done==0}">
                    {{ o.done | doneLabelRecebidas }}
                </td>
                <td>
                    <a v-link="{ name: 'bill-receive.update', params: { id: o.id } }" class="btn btn-primary btn-xs">Editar</a>
                    <a href="#" class="btn btn-danger btn-xs" @click.prevent="destroyBill(o)">Excluir</a>
                </td>
            </tr>
            </tbody>
        </table>
    `,
    data: function () {
        return {
            bills: []
        };
    },
    created: function () {
        var self = this;
        BillReceive.query().then(function (response) {
            self.bills = response.data;
        });
    },
    methods: {
        destroyBill: function (bill) {
            if (confirm("Deseja realmente excluir a conta?")) {
                var self = this;
                BillReceive.delete({id: bill.id}).then(function (response) {
                    self.bills.$remove(bill);
                    self.$dispatch('change-info');
                });
            }
        }
    }
});