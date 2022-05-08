const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    name: {type:String, required: true },
    email: {type:String, required: true},
    mobile: {type:String, required: true},

    accNo: {type:String, required: true},
    exDate: {type:String, required: true},
    cvv: {type:String, required: true},
},{
    timestamps: true,
});
const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;