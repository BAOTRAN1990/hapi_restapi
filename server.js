'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const Joi = require('joi');
const HapiMongo = require('hapi-mongodb');

require('./common/global.js');
const addUserController = require('./api/add_user/controller/addUserController');

const dbOpts = {
    url: 'mongodb://localhost:27017/hapi_training',
    settings: {
        poolSize: 10
    },
    decorate: true
};

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

const options = {
    info: {
            'title': 'Test API Documentation',
            'version': Pack.version,
        }
};

server.route({
    method: 'GET',
    path: '/{name?}',
    config: {
        handler: function (request, reply) {
            reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
        },
        tags: ['api'],
        validate: {
            params: {
                name: Joi.string().required().default('Bao')
            }
        }
    }
});

server.route({
    method: 'POST',
    path: '/user',
    config: {
        handler: function (request, reply) {
            return addUserController.addUser(request,reply).then(result => {
                reply(result);
            }).catch(err => {
                reply(err);
            });
        },
        description: 'Add new user',
        tags: ['api', 'user'],
        validate: {
            payload: Joi.object({
                userName: Joi.string().required().default('Bao Tran'),
                email: Joi.string().email().required().default('ducbao90@gmail.com'),
                password: Joi.string().required(),
                birthday: Joi.string()
            }).label('userInfo')
        }
    }
});

server.register([
    Inert,
    Vision,
    {
        'register': HapiSwagger,
        'options': options
    },
    {
        'register': HapiMongo,
        'options': dbOpts
    }],(err) => {
        server.start( (err) => {
            if (err) {
                throw err;
            }
            console.log(`Server running at: ${server.info.uri}`);
        });
    }
);