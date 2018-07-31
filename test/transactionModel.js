const chai = require('chai');
const TransactionModel = require('../src/TransactionModel.js');
const expect = chai.expect;

describe('Transaction model', () => {
  describe('When create a new transaction', () => {
    const transactionModel = new TransactionModel();
    it('Create a new transaction', () => expect(transactionModel).to.be.an('object'));
  });

  describe('When create a new transaction with value and type', () => {
    const date = new Date();
    const transactionModel = new TransactionModel({ value: 10, type: "Description", date });
    it('Transaction is a object', () => expect(transactionModel).to.be.an('object'));
    it('Transaction has value', () => expect(transactionModel.value).to.equal(10));
    it('Transaction has description', () => expect(transactionModel.type).to.equal('Description'));
    it('Clone the date', () => expect(transactionModel.date).to.not.equal(date));
    it('Transaction has date', () => expect(transactionModel.date.getTime()).to.equal(date.getTime()));
    it('Transaction has createAt', () => expect(transactionModel.createAt).to.exist);
    it('Transaction has updateAt', () => expect(transactionModel.updateAt).to.exist);
  });

  describe('When create a new transaction with value and type', () => {
    const date = new Date();
    const transactionModel = new TransactionModel({ value: 10, type: "Description", date });
    const transactionJSON = transactionModel.toJSON();
    it('Transaction is a object', () => expect(transactionJSON).to.be.an('object'));
    it('Transaction has value', () => expect(transactionJSON.value).to.equal(10));
    it('Transaction has description', () => expect(transactionJSON.type).to.equal('Description'));
    it('Transaction has date', () => expect(transactionJSON.date).to.equal(date.getTime()));
    it('Transaction has createAt', () => expect(transactionJSON.createAt).to.exist);
    it('Transaction has updateAt', () => expect(transactionJSON.updateAt).to.exist);
  });

  describe('When create a new transaction with id', () => {
    const transactionModel = new TransactionModel({ id: '123' });
    it('Transaction has id', () => expect(transactionModel.id).to.equal('123'));
  });
});
