'use strict';

const Boom = require('boom');
const dataAccess = require('../../../common/dataManager');

/**
 * this function will add new user to database
 * @param req   request from client
 * @param res   response to client
 */
function addUser(req, res){
    //console.log(req.payload);
    const db = req.mongo.db;
    const ObjectID = req.mongo.ObjectID;
    const dbOperations = new dataAccess.Operations();

    let newUserInfo = req.payload;

    return dbOperations.findOne(db, 'user', {email: newUserInfo.email}).then(result => {
        // console.log(result);
        if(result !== null){
            return Promise.reject(Boom.conflict('Conflict user email.', null));
        } else {
            newUserInfo._id = new ObjectID();
            return dbOperations.insert(db, 'user', newUserInfo);
        }
    }).then(result => {
        return Promise.resolve(newUserInfo);
    }).catch(err => {
        // console.log("here");
        return Promise.reject(err);
    });
}

module.exports.addUser = addUser;