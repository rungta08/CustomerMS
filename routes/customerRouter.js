const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helper = require('../utility/_helper');

const Customers = require('../models/customers');

const customerRouter = express.Router();
customerRouter.use(bodyParser.json());

customerRouter.route('/')
.get(helper.validEmployee, (req, res, next) => {
    Customers.find({})
    .then((customers) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(customers);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(helper.validEmployee, (req, res, next) => {
    Customers.create(req.body)
    .then((customer) => {
        console.log('Customer Created ', customer);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(customer);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(helper.validAdmin, (req, res, next) => {
    Customers.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

customerRouter.route('/:customerId')
.get(helper.validEmployee, (req, res, next) => {
    Customers.findById(req.params.customerId)
    .then((customer) => {
        console.log(customer);
            helper.getAccounts(customer.pancard)
            .then((response) => {
                console
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({customer: customer, accounts: response.data});
            })
            .catch((err) => next(err));
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(helper.validEmployee, (req, res, next) => {
    Customers.findByIdAndUpdate(req.params.customerId, {
        $set: req.body
    }, { new: true })
    .then((customer) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(customer);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(helper.validEmployee, (req, res, next) => {
     Customers.findByIdAndRemove(req.params.customerId)
    .then((resp) => {
        helper.deleteAccounts(customer.pancard)
            .then((response) => {
                next();
            })
            .catch((err) => next());
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = customerRouter;