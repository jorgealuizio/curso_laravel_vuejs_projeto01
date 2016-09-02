window.billComponent = Vue.extend({
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
        <router-view></router-view>
    `,
    data: function () {
        return {
            menus: [
                {name: "Contas a pagar", routeName: 'bill-pay.list'},
                {name: "Contas a receber", routeName: 'bill-receive'}
            ],
        }
    }
});