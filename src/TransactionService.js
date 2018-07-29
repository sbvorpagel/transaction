const TransactionModel = require('./TransactionModel.js');
const uuid = require('uuid/v4');

const bd = [];
const DAO = {
    insert: (data) => new Promise((resolve) => {
        bd.push(data);
        resolve();
    }),
    get: (id) => new Promise((resolve) => resolve(bd.find(transaction => transaction.id === id))),
    list: (sort) => new Promise((resolve) => {
        if (!!sort) {
            resolve(bd.filter(sort));
        } else {
            resolve([...bd]);
        }
    }),
    remove: (id) => new Promise((resolve) => resolve(bd.filter(transaction => transaction.id !== id))),
}

const create = async (entity) => {
    const id = uuid();
    await DAO.insert({...entity, id});
    return get(id);
}

const get = (id) => {
    return DAO.get(id)
        .then((data) => new TransactionModel(data).toJSON());
}

module.exports = {create, get};
