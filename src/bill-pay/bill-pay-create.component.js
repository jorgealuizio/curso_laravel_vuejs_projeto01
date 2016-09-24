const namesPay = [
    'Conta de luz',
    'Conta de água',
    'Conta de telefone',
    'Supermercado',
    'Cartão de crédito',
    'Empréstimo',
    'Gasolina'
];

window.billPayCreateComponent = Vue.extend({
    template: `
        <h3>{{ formType == "insert" ? "Incluir Conta a Pagar" : "Editar Conta a Pagar" }}</h3>
        <br>
        <form name="form" @submit.prevent="submit">
            <div class="form-group">
                <label>Vencimento:</label>
                <input type="text" class="form-control" v-model="bill.date_due | dateFormat 'pt-BR'"/>
            </div>
            <div class="form-group">
                <label>Nome:</label>
                <select class="form-control" v-model="bill.name">
                    <option v-for="obj in names" :value="obj">{{ obj | textCaseFormat }}</option>
                </select>
            </div>
            <div class="form-group">
                <label>Valor:</label>
                <input type="text" class="form-control" v-model="bill.value | numberFormat 'pt-BR' 'BRL'"/>
            </div>
            <legend>Conta Paga?</legend>
            <label class="radio-inline">
                <input type="radio" id="0" v-model="bill.done" value=0> Não
            </label>
            <label class="radio-inline">
                <input type="radio" id="1" v-model="bill.done" value=1> Sim
            </label>
            <hr>
            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Salvar"/>
            </div>
        </form>
    `,
    data() {
        return {
            names: namesPay,
            formType: 'insert',
            bill: new ClassBill()
        };
    },
    created() {
        if(this.$route.name == 'bill-pay.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit() {
            let data = this.bill.toJSON();
            if (this.formType == 'insert') {
                BillPay.save({}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                });
            } else {
                BillPay.update({id: this.bill.id}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                });
            }
        },
        getBill(id) {
            BillPay.get({id: id}).then((response) => {
                this.bill = new ClassBill(response.data);
            });
        },
        getDateDue(date_due) {
            let dateDueObject = date_due;
            if(!(date_due instanceof Date)){
                dateDueObject = new Date(dateDueObject.split('/').reverse().join('-')+"T03:00:00");
            }
            //return dateDueObject.toISOString().split('T')[0];
            return dateDueObject.substring(0,10);
        }
    }
});