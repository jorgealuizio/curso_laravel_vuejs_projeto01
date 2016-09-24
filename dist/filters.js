"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Vue.filter('doneLabelPagas', function (value) {
    return value == 0 ? "Não paga" : "Paga";
});

Vue.filter('doneLabelRecebidas', function (value) {
    return value == 0 ? "Não recebida" : "Recebida";
});

Vue.filter('statusContasPagas', function (value) {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }
    if (!value) {
        return "Nenhuma conta a pagar";
    }
    return "Existe(m) " + value + " conta(s) a ser(em) paga(s)";
});

Vue.filter('statusContasRecebidas', function (value) {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }
    if (!value) {
        return "Nenhuma conta a receber";
    }
    return "Existe(m) " + value + " conta(s) a ser(em) recebidas(s)";
});

Vue.filter('numberFormat', {
    read: function read(value) {
        var lang = arguments.length <= 1 || arguments[1] === undefined ? 'pt-BR' : arguments[1];
        var moeda = arguments.length <= 2 || arguments[2] === undefined ? 'BRL' : arguments[2];

        var number = 0;
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
            var numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
            number = numberRegex ? numberRegex[0] : numberRegex;
        }
        return new Intl.NumberFormat(lang, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: moeda
        }).format(number);
    },
    write: function write(value) {
        var number = 0;
        if (value.length > 0) {
            number = value.replace(/[^\d\,]/g, '').replace(/\,/g, '.');
            number = isNaN(number) ? 0 : parseFloat(number);
        }
        return number;
    }
});

Vue.filter('dateFormat', {
    read: function read(value) {
        var lang = arguments.length <= 1 || arguments[1] === undefined ? 'pt-BR' : arguments[1];

        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
            if (!(value instanceof Date)) {
                var dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
                var dateString = dateRegex ? dateRegex[0] : dateRegex;
                if (dateString) {
                    value = new Date(dateString + "T03:00:00");
                } else {
                    return value;
                }
            }
            return new Intl.DateTimeFormat(lang).format(value).split(' ')[0];
        }
        return value;
    },
    write: function write(value) {
        var dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);
        if (dateRegex) {
            var dateString = dateRegex[0];
            var date = new Date(dateString.split('/').reverse().join('-') + "T03:00:00");
            if (!isNaN(date.getTime())) {
                return date.toLocaleDateString().split('/').reverse().join('-');
            }
        }
        return value;
    }
});

Vue.filter('textCaseFormat', {
    read: function read(value) {
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
            return value.toUpperCase();
        }
        return value;
    },
    write: function write(value) {
        if (!isNaN(value)) {
            return value.toLowerCase();
        }
        return value;
    }
});