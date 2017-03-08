'use strict';

const Boom = require('boom');
const dataAccess = require('../../../common/dataManager');

/**
 * this function will get user details information
 * @param req   request from client
 * @param res   response to client
 */
function getUserDtl(req, res){
    const db = req.mongo.db;
    const ObjectID = req.mongo.ObjectID;
    const dbOperations = new dataAccess.Operations();

    return dbOperations.findOne(db, 'user', {_id: new ObjectID(req.params.userID)}).then(result => {
        if(result === null){
            return Promise.reject(Boom.notFound('User not found', null));
        } else {
            return Promise.resolve(result);
        }
    }).catch(err => {
        return Promise.reject(err);
    });
}

module.exports.getUserDtl = getUserDtl;