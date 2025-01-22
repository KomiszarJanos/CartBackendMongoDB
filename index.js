const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require ('body-parser'); 
const cors =require('cors');

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());

const products= require('./routes/products');
const order= require('./routes/order');
app.use("/api", order);
app.use("/api", products);

const connecttoDB = async ()=> {
    try { await mongoose.connect('mongodb://localhost:27017/Cart' 
        
    )
    console.log('connected');    
    }
    catch(error) {console.log(error); process.exit(1);   
    }
}
connecttoDB();

const port =3000;
app.listen(port, ()=>{console.log("mukodik")});
