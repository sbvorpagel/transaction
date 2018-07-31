let bd = [];
module.exports = {
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
    resolve({ id });
  }),
}
