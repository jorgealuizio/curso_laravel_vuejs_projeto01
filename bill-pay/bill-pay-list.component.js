window.billPayListComponent = Vue.extend({
    template: `
        <table class="table table-hover">
            <thead>
            <tr class="text-primary">
                <th>#</th>
                <th>Vencimento</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Paga?</th>
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
                    {{ o.done | doneLabelPagas }}
                </td>
                <td>
                    <a v-link="{ name: 'bill-pay.update', params: { index: index } }" class="btn btn-primary btn-xs">Editar</a>
                    <a href="#" class="btn btn-danger btn-xs" @click.prevent="destroyBill(o)">Excluir</a>
                </td>
            </tr>
            </tbody>
        </table>
    `,
    data: function () {
        return {
            bills: this.$root.$children[0].billsPay
        };
    },
    methods: {
        destroyBill: function (bill) {
            if (confirm("Deseja realmente excluir a conta?")) {
                this.$root.$children[0].billsPay.$remove(bill);
            }
        }
    }
});