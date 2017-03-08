'use strict';

const Boom = require('boom');
const dataAccess = require('../../../common/dataManager');

/**
 * this function will get user details information
 * @param req   request from client
 * @param res   response to client
 */
function getListUsers(req, res){
    const db = req.mongo.db;
    const ObjectID = req.mongo.ObjectID;
    const dbOperations = new dataAccess.Operations();

    return dbOperations.findAll(db, 'user').then(result => {
        return Promise.resolve({listUsers: result});
    }).catch(err => {
        return Promise.reject(err);
    });
}

module.exports.getListUsers = getListUsers;