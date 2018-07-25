module.exports = class Transaction {
    constructor({value, type} = {}) {
        this._value = value;
        this._type = type;
        this._date = new Date();
    }

    get value() {
        return this._value;
    }

    get type() {
        return this._type;
    }

    get date() {
        return this._date;
    }
}