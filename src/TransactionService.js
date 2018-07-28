const TransactionModel = require('./TransactionModel.js');
const uuid = require('uuid/v4');

const create = (entity) => {
    return new Promise((resolve) => {
        const id = uuid();
        resolve(new TransactionModel({...entity, id}));
    });
}

module.exports = {create};