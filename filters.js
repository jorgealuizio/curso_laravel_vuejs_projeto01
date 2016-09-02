// Filtro personalizado para a coluna CONTA PAGA
Vue.filter('doneLabel', function (value) {
    if (value == 1) {
        return "Paga";
    }
    return "Não paga";
});

// Filtro para exibição das mensagens de Contas pagas/não pagas
Vue.filter('statusLabel', function (value) {
    if(value === false) {
        return "Nenhuma conta cadastrada";
    }
    if (!value) {
        return "Nenhuma conta a pagar";
    }
    return "Existe(m) " + value + " conta(s) a ser(em) paga(s)";
});