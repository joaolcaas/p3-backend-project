const swagger = require('swagger-jsdoc');

const swaggerDef = {
    'basePath': '/',
    'host': 'localhost:3000',
    'info': {
        'description': 'Site para você marcar partidas com pessoas que gostam dos seus jogos o tanto que você gosta!',
        'title': 'ForFunMatch',
        'version': '1.0.0'
    }
};

const options = {
    'apis': ['../**/*docs.js'],
    'swaggerDefinition': swaggerDef
};

const swaggerSpec = swagger(options);

module.exports = swaggerSpec;