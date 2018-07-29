const chai = require('chai');
chai.use(require('chai-uuid'));
const TransactionService = require('../src/TransactionService.js');

const {expect} = chai;
const {create, get} = TransactionService;

describe('Transaction service', () => {
    describe('When create a transaction', () => {
        it('Create is a promise', () => expect(create()).to.be.a('promise'));
        it('Create return a full entity', () => {
            const date = new Date();
            create({value: 10, type: "Description", date})
                .then(transaction => {
                    expect(transaction).to.be.an('object');
                    expect(transaction.id).to.be.a.uuid('v4');
                    expect(transaction.value).to.equal(10);
                    expect(transaction.type).to.equal('Description');
                    expect(transaction.date).to.not.equal(date);
                    expect(transaction.date).to.equal(date.getTime());
                    expect(transaction.createAt).to.exist;
                    expect(transaction.updateAt).to.exist;
                })
                .catch(() => {
                    throw new Error('was not supposed to fail');
                });
        });
    });
    describe('When get a transaction', () => {
        it('Get is a promise', () => expect(get()).to.be.a('promise'));
        it('Get return a full entity', () => {
            const date = new Date();
            create({value: 10, type: "Description", date})
                .then(({id}) => get(id)
                    .then(transaction => {
                        expect(transaction).to.be.an('object');
                        expect(transaction.id).to.be.a.uuid('v4');
                        expect(transaction.value).to.equal(10);
                        expect(transaction.type).to.equal('Description');
                        expect(transaction.date).to.not.equal(date);
                        expect(transaction.date).to.equal(date.getTime());
                        expect(transaction.createAt).to.exist;
                        expect(transaction.updateAt).to.exist;
                    })
                    .catch(() => {
                        throw new Error('was not supposed to fail');
                    })
                )
        });
    });
});
