const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const router = require('./routes/product');
const userrouter = require('./routes/user');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended: true}));

app.use('/product', router);
app.use('/user', userrouter);
const URL = process.env.MONGO_URL;



mongoose.connect(URL,{
    useNewUrlParser: true,
   
});

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("Mongodb connected successfull");
});





app.listen(PORT,()=>{
    console.log(`server connected to port : ${PORT}`);
});