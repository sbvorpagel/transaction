let bd = [];
module.exports = {
  insert: (data) => {
    bd.push(data);
    return Promise.resolve();
  },
  get: id => Promise.resolve(bd.find(transaction => transaction.id === id)),
  list: (sort) => {
    const keys = Object.keys(sort || {});
    return Promise.resolve(
      keys.reduce((array, key) => array.filter(element => element[key] === sort[key]), bd),
    );
  },
  remove: (id) => {
    if (!id) {
      return Promise.resolve({});
    }
    bd = bd.filter(transaction => transaction.id !== id);
    return Promise.resolve({ id });
  },
  update: (id, value) => {
    if (!id) {
      return Promise.resolve({});
    }
    bd = bd.map((transaction) => {
      if (transaction.id === id) {
        return { ...transaction, ...value };
      }
      return transaction;
    });
    return Promise.resolve({ ...bd.find(transaction => transaction.id === id) });
  },
};
