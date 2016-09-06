// Filtro personalizado para a coluna CONTA PAGA
Vue.filter('doneLabelPagas', function (value) {
    if (value == 1) {
        return "Paga";
    }
    return "Não paga";
});

// Filtro personalizado para a coluna CONTA RECEBIDA
Vue.filter('doneLabelRecebidas', function (value) {
    if (value == 1) {
        return "Recebida";
    }
    return "Não recebida";
});

// Filtro para exibição das mensagens de Contas pagas/não pagas
Vue.filter('statusContasPagas', function (value) {
    if(value === false) {
        return "Nenhuma conta cadastrada";
    }
    if (!value) {
        return "Nenhuma conta a pagar";
    }
    return "Existe(m) " + value + " conta(s) a ser(em) paga(s)";
});

// Filtro para exibição das mensagens de Contas recebidas/não recebidas
Vue.filter('statusContasRecebidas', function (value) {
    if(value === false) {
        return "Nenhuma conta cadastrada";
    }
    if (!value) {
        return "Nenhuma conta a receber";
    }
    return "Existe(m) " + value + " conta(s) a ser(em) recebidas(s)";
});