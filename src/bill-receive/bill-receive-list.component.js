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
                <td>{{ o.date_due | dateFormat 'pt-BR' }}</td>
                <td>{{ o.name | textCaseFormat }}</td>
                <td>{{ o.value | numberFormat 'pt-BR' 'BRL' }}</td>
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
    data() {
        return {
            bills: []
        };
    },
    created() {
        BillReceive.query().then((response) => {
            this.bills = response.data;
        });
    },
    methods: {
        destroyBill(bill) {
            if (confirm("Deseja realmente excluir a conta?")) {
                BillReceive.delete({id: bill.id}).then((response) => {
                    this.bills.$remove(bill);
                    this.$dispatch('change-info');
                });
            }
        }
    }
});