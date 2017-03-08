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
const signInController = require('./api/sign_in/controller/signInController');
const getUserDtlController = require('./api/get_user_details/controller/getUserDtlController');
const getListUserController = require('./api/get_list_user/controller/getListUserController');

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
    method: 'POST',
    path: '/user',
    config: {
        handler: function (request, reply) {
            return reply(addUserController.addUser(request,reply));
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

server.route({
    method: 'POST',
    path: '/signin',
    config: {
        handler: function (request, reply) {
            return reply(signInController.signIn(request,reply));
        },
        description: 'Sign in',
        tags: ['api', 'Sign in'],
        validate: {
            payload: Joi.object({
                userName: Joi.string().required().default('Bao Tran'),
                email: Joi.string().email().required().default('ducbao90@gmail.com')
            }).label('userCredential')
        }
    }
});

server.route({
    method: 'GET',
    path: '/user/{userID}',
    config: {
        handler: function (request, reply) {
            return reply(getUserDtlController.getUserDtl(request,reply));
        },
        description: 'Get user details information',
        tags: ['api', 'user'],
        validate: {
            params: {
                userID: Joi.string().required()
            }
        }
    }
});

server.route({
    method: 'GET',
    path: '/user',
    config: {
        handler: function (request, reply) {
            return reply(getListUserController.getListUsers(request,reply));
        },
        description: 'Get all users',
        tags: ['api', 'user']
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