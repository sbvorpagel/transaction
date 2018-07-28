const chai = require('chai');
chai.use(require('chai-uuid'));
const TransactionService = require('../src/TransactionService.js');
const {expect, assert, should} = chai;
const {create} = TransactionService;

describe('Transaction service', () => {
    describe('When create a transaction', () => {
        it('Create is a promise', () => expect(create()).to.be.a('promise'));
        describe('Create return a entity with id', () => {
            const date = new Date();
            create({value: 10, type: "Description", date})
                .then(transaction => {
                    it('Transaction is a object', () => expect(transaction).to.be.an('object'));
                    it('Transaction has id', () => expect(transaction.id).to.be.a.uuid('v4'));
                    it('Transaction has value', () => expect(transaction.value).to.equal(10));
                    it('Transaction has description', () => expect(transaction.type).to.equal('Description'));
                    it('Clone the date', () => expect(transaction.date).to.not.equal(date));
                    it('Transaction has date', () => expect(transaction.date.getTime()).to.equal(date.getTime()));
                    it('Transaction has createAt', () => expect(transaction.createAt).to.exist);
                    it('Transaction has updateAt', () => expect(transaction.updateAt).to.exist);
                })
                .catch(() => {
                    throw new Error('was not supposed to fail');
                });
        });
    });
});