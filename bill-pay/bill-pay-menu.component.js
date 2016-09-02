window.billPayMenuComponent = Vue.extend({
    template: `
        <nav class="navbar navbar-default">
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li v-for="m in menus">
                        <a v-link="{ name: m.routeName }">{{ m.name }}</a>
                    </li>
                </ul>
            </div>
        </nav>
    `,
    data: function () {
        return {
            menus: [
                {id: 0, name: "Listar contas", routeName: 'bill-pay.list'},
                {id: 1, name: "Criar conta", routeName: 'bill-pay.create'}
            ],
        }
    }
});