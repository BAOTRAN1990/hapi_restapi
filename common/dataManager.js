'use strict';

class Operations {
    findOne(db, collectionName, findConditionObj){
        return new Promise((resolve, reject) => {
            db.collection(collectionName).findOne(findConditionObj, function (err, result){
                if(err){
                    return reject(Boom.internal('Internal MongoDB error', err));
                } else {
                    return resolve(result);
                }
            });
        });
    }

    findAll(db, collectionName){
        return new Promise((resolve, reject) => {
            db.collection(collectionName).find().toArray(function (err, result){
                if(err){
                    return reject(Boom.internal('Internal MongoDB error', err));
                } else {
                    return resolve(result);
                }
            });
        });
    }

    insert(db, collectionName, listDocuments){
        return new Promise((resolve, reject) => {
            db.collection(collectionName).insert(listDocuments, function (err, result){
                if(err){
                    return reject(Boom.internal('Internal MongoDB error', err));
                } else {
                    return resolve(result);
                }
            });
        });
    }
}

module.exports.Operations = Operations;