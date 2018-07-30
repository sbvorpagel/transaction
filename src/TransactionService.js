const TransactionModel = require('./TransactionModel.js');
const uuid = require('uuid/v4');

let bd = [];
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
    remove: (id) => new Promise((resolve) => {
        if (!id) {
            resolve({});
        }
        bd = bd.filter(transaction => transaction.id !== id);
        resolve({id});
    }),
}

const create = async (entity) => {
    const id = uuid();
    await DAO.insert({...entity, id});
    return get(id);
}

const get = (id) => {
    return DAO.get(id)
        .then((data) => {
            if (data && data.id) {
                return new TransactionModel(data).toJSON();
            }
            return null;
        });
}

const search = (sort) => {
    return DAO.list(sort)
        .then((list) => list.map(item => new TransactionModel(item).toJSON()));
}

const remove = (id) => {
    return DAO.remove(id);
}

module.exports = {create, get, search, remove};
