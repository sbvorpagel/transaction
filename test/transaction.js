const chai = require('chai');
const Transaction = require('../src/model/Transaction.js');
const expect = chai.expect;

describe('Transaction model', () => {
    it('When create a new transaction', () => {
        const transaction = new Transaction();
        expect(transaction).to.be.an('object');
    });

    it('When create a new transaction with value and type', () => {
        const transaction = new Transaction({value: 10, type: "Description"});
        expect(transaction).to.be.an('object');
        expect(transaction.value).to.equal(10);
        expect(transaction.type).to.equal('Description');
        expect(transaction.date).to.exist;
    });
});