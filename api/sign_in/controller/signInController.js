'use strict';

const Boom = require('boom');
const dataAccess = require('../../../common/dataManager');

/**
 * this function will sign in by user credential
 * @param req   request from client
 * @param res   response to client
 */
function signIn(req, res){
    //console.log(req.payload);
    const db = req.mongo.db;
    const ObjectID = req.mongo.ObjectID;
    const dbOperations = new dataAccess.Operations();

    let userCredential = req.payload;

    return dbOperations.findOne(db, 'user', {userName: userCredential.userName, email: userCredential.email}).then(result => {
        //console.log(result);
        if(result === null){
            return Promise.reject(Boom.unauthorized('Wrong username and password.', null));
        } else {
            return Promise.resolve(result);
        }
    }).catch(err => {
        // console.log("here");
        return Promise.reject(err);
    });
}

module.exports.signIn = signIn;