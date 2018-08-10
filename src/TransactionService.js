const uuid = require('uuid/v4');
const TransactionModel = require('./TransactionModel.js');

const use = (element) => {
  const keys = Object.keys(element);
  this[keys[0]] = element[keys[0]];
};

const get = id => this.DAO.get(id)
  .then((data) => {
    if (data && data.id) {
      return new TransactionModel(data).toJSON();
    }
    return null;
  });

const create = async (entity) => {
  const id = uuid();
  await this.DAO.insert({ ...entity, id });
  return get(id);
};

const search = sort => this.DAO.list(sort)
  .then(list => list.map(item => new TransactionModel(item).toJSON()));

const remove = id => this.DAO.remove(id);

const update = (id, entity) => this.DAO.update(id, entity);

module.exports = {
  create,
  get,
  search,
  remove,
  update,
  use,
};
