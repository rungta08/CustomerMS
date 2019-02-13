const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    pancard: {
        type: Number,
        required: true,
        unique:true
    }
},{
    timestamps: true
});

var Customers = mongoose.model('Customer', customerSchema);

module.exports = Customers;