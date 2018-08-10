[![Build Status](https://travis-ci.org/sbvorpagel/module-transaction.svg?branch=master)](https://travis-ci.org/sbvorpagel/module-transaction)

# TRANSACTION

This module has the experiment "Universal Javascript". It is a transaction manager that can be used front-end and not back-end. To manager the data, you can inject the DAO generic.

# Usage

## Install

`npm i @sbv/transaction`

## Import

`const transaction = require('@sbv/transaction');`

or

`import transaction from '@sbv/transaction';`

## DAO registre

`transaction.use({DAO: GenericDriver});`

## API

`const {create, get, search, remove} = transaction;`

### Create a trasaction

`transaction.create({value: 10, type: "Type of transaction", date: new Date()});`

### Search a trasaction

`transaction.search((transaction => value === 10)); // Search all transactions with value equals to 10`

### Get a trasaction

`transaction.get(id); // Get a transaction by id`

### Remove a trasaction

`transaction.remove(id); // Remove a transaction by id`
