window.billReceiveCreateComponent = Vue.extend({
    template: `
        <h3>{{ formType == "insert" ? "Incluir Conta a Receber" : "Editar Conta a Receber" }}</h3>
        <br>
        <form name="form" @submit.prevent="submit">
            <div class="form-group">
                <label>Vencimento:</label>
                <input type="text" class="form-control" v-model="bill.date_due"/>
            </div>
            <div class="form-group">
                <label>Nome:</label>
                <select class="form-control" v-model="bill.name">
                    <option v-for="obj in names" :value="obj">{{ obj }}</option>
                </select>
            </div>
            <div class="form-group">
                <label>Valor:</label>
                <input type="text" class="form-control" v-model="bill.value"/>
            </div>
            <legend>Conta Recebida?</legend>
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
    data: function () {
        return {
            names: [
                'Sites',
                'Sistemas',
                'Consultoria',
                'Suporte Técnico',
                'Treinamentos'
            ],
            formType: 'insert',
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            }
        };
    },
    created: function () {
        if(this.$route.name == 'bill-receive.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.index);
        }
    },
    methods: {
        submit: function () {
            if (this.formType == 'insert') {
                this.$root.$children[0].billsReceive.push(this.bill);
            }
            // Limpar o formulário
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            };
            this.$router.go({name: 'bill-receive.list'});
        },
        getBill: function (index) {
            var bills = this.$root.$children[0].billsReceive;
            this.bill = bills[index];
        }
    }
});