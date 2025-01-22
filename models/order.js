const mongoose= require('mongoose');

const itemShema = new mongoose.Schema(
    {name: {
        type:String,
        required:true
    },
    quantity: {
        type:Number,
        required:true
    },
    price: {
        type:Number,
        required:true
    }
    }
)

const ProductsScema= new mongoose.Schema (
{
    name: {
            type:String,
            required: [true, "Name is Required!"]
        },
    emailAddress: {
            type:String,
            required:true
        },
    phoneNumber: {
        type:String,
        required:true
    },
    items: [itemShema],
    totalsum: {
        type:Number, 
        required:true}

}

)
module.exports=mongoose.model("order", ProductsScema);