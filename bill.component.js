window.billComponent = Vue.extend({
    template: `
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" v-link="{ name: 'dashboard' }">Dashboard</a>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li v-for="m in menus">
                        <a v-link="{ name: m.routeName }">{{ m.name }}</a>
                    </li>
                </ul>
            </div>
        </nav>
        <br><br><br>
        <router-view></router-view>
    `,
    data: function () {
        return {
            menus: [
                {name: "Contas a pagar", routeName: 'bill-pay.list'},
                {name: "Contas a receber", routeName: 'bill-receive.list'}
            ],
        }
    }
});