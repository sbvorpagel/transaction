const chai = require('chai');
const Transaction = require('../src/model/Transaction.js');
const expect = chai.expect;

describe('Transaction model', () => {
    describe('When create a new transaction', () => {
        const transaction = new Transaction();
        it('Create a new transaction', () => expect(transaction).to.be.an('object'));
    });

    describe('When create a new transaction with value and type', () => {
        const date = new Date();
        const transaction = new Transaction({value: 10, type: "Description", date});
        it('Transaction is a object', () => expect(transaction).to.be.an('object'));
        it('Transaction value', () => expect(transaction.value).to.equal(10));
        it('Transaction description', () => expect(transaction.type).to.equal('Description'));
        it('Clone the date', () => expect(transaction.date).to.not.equal(date));
        it('Transaction date', () => expect(transaction.date.getTime()).to.equal(date.getTime()));
        it('Transaction createAt', () => expect(transaction.createAt).to.exist);
        it('Transaction updateAt', () => expect(transaction.updateAt).to.exist);
    });
});