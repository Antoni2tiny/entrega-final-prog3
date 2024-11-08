const expressHandlebars = require('express-handlebars');

// Configurar Handlebars y definir los helpers personalizados
const hbs = expressHandlebars.create({
    helpers: {
        // Helper personalizado 'ifCond' para comparar valores
        ifCond: function (v1, operator, v2, options) {
            switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        }
    }
});

module.exports = hbs;
