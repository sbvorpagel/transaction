const TransactionModel = require('./TransactionModel.js');
const uuid = require('uuid/v4');

const use = (element) => {
   const keys = Object.keys(element);
   this[keys[0]] = element[keys[0]];
};

const create = async (entity) => {
    const id = uuid();
    await this.DAO.insert({...entity, id});
    return get(id);
};

const get = (id) => {
    return this.DAO.get(id)
        .then((data) => {
            if (data && data.id) {
                return new TransactionModel(data).toJSON();
            }
            return null;
        });
};

const search = (sort) => {
    return this.DAO.list(sort)
        .then((list) => list.map(item => new TransactionModel(item).toJSON()));
};

const remove = (id) => {
    return this.DAO.remove(id);
};

module.exports = {create, get, search, remove, use};
