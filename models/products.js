const mongoose= require('mongoose');

const ProductsScema= new mongoose.Schema (
{
    Id: {
        type:Number, 
        required:true,
        unique:true
        },
    name: {
            type:String,
            required: [true, "Name is Required!"]
        },
    price: {
            type:Number,
            required:true
        },
    image: {
        type:String,
        required:true
    },
    qantity: {
        type:Number,
        required:true
    }

}

)
module.exports=mongoose.model("products", ProductsScema);