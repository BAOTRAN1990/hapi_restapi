'use strict';

const Boom = require('boom');
const dataAccess = require('../../../common/dataManager');

/**
 * this function will sign in by user credential
 * @param req   request from client
 * @param res   response to client
 */
function signIn(req, res){
    const db = req.mongo.db;
    const ObjectID = req.mongo.ObjectID;
    const dbOperations = new dataAccess.Operations();
    //console.log(req.payload);
    let userCredential = req.payload;

    return dbOperations.findOne(db, 'user', {email: userCredential.email, password: userCredential.password}).then(result => {
        if(result === null){
            return Promise.reject(Boom.unauthorized('Wrong username and password.', null));
        } else {
            return Promise.resolve(result);
        }
    }).catch(err => {
        return Promise.reject(err);
    });
}

module.exports.signIn = signIn;