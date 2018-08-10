/* eslint-disable no-unused-expressions */
const chai = require('chai');
const TransactionService = require('../src/TransactionService.js');
const DAO = require('./MockDAO.js');

chai.use(require('chai-uuid'));

TransactionService.use({ DAO });

const { expect } = chai;
const {
  create,
  get,
  search,
  remove,
  update,
} = TransactionService;

describe('Transaction service', () => {
  describe('When create a transaction', () => {
    it('Create is a promise', () => expect(create()).to.be.a('promise'));
    it('Create return a full entity', () => {
      const date = new Date();
      create({ value: 10, type: 'Description', date })
        .then((transaction) => {
          expect(transaction).to.be.an('object');
          expect(transaction.id).to.be.a.uuid('v4');
          expect(transaction.value).to.equal(10);
          expect(transaction.type).to.equal('Description');
          expect(transaction.date).to.not.equal(date);
          expect(transaction.date).to.equal(date.getTime());
          expect(transaction.createAt).to.exist;
          expect(transaction.updateAt).to.exist;
        })
        .catch((e) => {
          throw new Error('was not supposed to fail', e);
        });
    });
  });
  describe('When get a transaction', () => {
    it('Get is a promise', () => expect(get()).to.be.a('promise'));
    it('Get return a full entity', () => {
      const date = new Date();
      create({ value: 10, type: 'Description', date })
        .then(({ id }) => get(id)
          .then((transaction) => {
            expect(transaction).to.be.an('object');
            expect(transaction.id).to.be.a.uuid('v4');
            expect(transaction.value).to.equal(10);
            expect(transaction.type).to.equal('Description');
            expect(transaction.date).to.not.equal(date);
            expect(transaction.date).to.equal(date.getTime());
            expect(transaction.createAt).to.exist;
            expect(transaction.updateAt).to.exist;
          })
          .catch((e) => {
            throw new Error('was not supposed to fail', e);
          }));
    });
  });
  describe('When search a transaction', () => {
    it('Search is a promise', () => expect(get()).to.be.a('promise'));
    it('Search return an Array of transactions', async () => {
      const date1 = new Date();
      const date2 = new Date();
      await create({ value: 10, type: 'Description', date1 });
      await create({ value: 10, type: 'Description', date2 });
      search()
        .then(transactions => expect(transactions).to.be.an('Array'))
        .catch((e) => {
          throw new Error('was not supposed to fail', e);
        });
    });
    it('Search with filter return an Array of transactions', async () => {
      const date1 = new Date();
      const date2 = new Date();
      let id1;
      await create({ value: 10, type: 'Description', date1 }).then(({ id }) => { id1 = id; });
      await create({ value: 10, type: 'Description', date2 });
      search(registry => registry.id === id1)
        .then((transactions) => {
          expect(transactions).to.be.an('Array');
          expect(transactions).to.have.a.lengthOf(1);
        })
        .catch((e) => {
          throw new Error('was not supposed to fail', e);
        });
    });
  });
  describe('When remove a transaction', () => {
    it('Remove is a promise', () => expect(remove()).to.be.a('promise'));
    it('Remove return a removed id', async () => {
      const date1 = new Date();
      let id1;
      await create({ value: 10, type: 'Description', date1 }).then(({ id }) => { id1 = id; });
      remove(id1)
        .then((result) => {
          expect(result).to.be.an('object');
          expect(result.id).to.equal(id1);
        })
        .catch((e) => {
          throw new Error('was not supposed to fail', e);
        });
      get(id1)
        .then(transaction => expect(transaction).to.be.null);
    });
  });
  describe('When update a transaction', () => {
    it('Update is a promise', () => expect(update()).to.be.a('promise'));
    it('Update return the updated entity', async () => {
      const date1 = new Date();
      let id1;
      await create({ value: 10, type: 'Description', date1 }).then(({ id }) => { id1 = id; });
      update(id1, { value: 20 })
        .then((result) => {
          expect(result).to.be.an('object');
          expect(result.value).to.equal(20);
        })
        .catch((e) => {
          throw new Error('was not supposed to fail', e);
        });
      get(id1)
        .then(transaction => expect(transaction.value).to.equal(20));
    });
  });
});
