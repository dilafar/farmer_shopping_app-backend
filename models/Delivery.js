const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        
    },
    name: {
        type: String,
        default: "test",
        
    },
    desc: {
        type: String,
        required: true,
        
    },
    img:{
        type: String,
        required: true,
    
    },
    categories:{
        type: String,
        required: true,
        
    },
    price:{
        type: Number,
        required: true,
        
    },
    inStock:{
        type:Boolean,
        default: true,
    }
},
{
    timestamps: true
});

const Delivery = mongoose.model("Delivery",DeliverySchema);
module.exports = Delivery;