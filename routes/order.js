const express= require('express');
const router= express.Router();
const Order= require('../models/order');


//post new
router.post('/order', async(req, res)=>
{
    try {
        const newOrder= new Order(req.body);
        await newOrder.save()
        .then((savedorder)=>{
            console.log(savedorder); 
            res.status(201).json({msg:"New product is saved"})
        })
        .catch((error)=> {console.log(error);
            res.status(500).json({msg:"unable to create new product"});
        })
        
    } 
    catch (error) {console.log(error); res.status(500).json({msg:"Unable to save new product"})
        
    }
}

)
//read all
router.get('/order', async(req, res)=>{
    try {
        Order.find()
       .then(order=>{console.log(order, "siker");
        res.status(200).json({order:order});
       })
       .catch((error)=> {console.log(error);
        res.status(500).json({msg:"unable to get products"});
    })
    }
    catch(error)
     {console.log(error); res.status(500).json({msg:"Unable to get products"})}
})

//read single doc by id when api/contacts/12324
//router.get('/contact/:id', async(req, res)=>{
//    try {
//        const id=req.params.id;
//       Contact.findById(id)
//       .then((contact)=>{console.log(contact);
//       res.status(201).json({msg:"here are the contact with id"}) 
//       })
//       .catch((error)=> {console.log(error);
//        res.status(500).json({msg:"unable to get contact with the id"});
//    })
//    }
//    catch(error)
//     {console.log(error); res.status(500).json({msg:"Unable to get contacts"})}
//})
//read search
router.get('/search', async(req, res)=>{
    try {
        const searchTerm=req.query.searchTerm;
        const searchMongos= new RegExp(searchTerm, "i");
        await Order.find(
        { name:searchMongos}
       )
       .then((order)=>{
        if(order.length) {
        console.log(order);
        res.status(200).json({order:order});} 
        else {res.status(200).json({order:order, msg:'there is no match'}); console.log("no match");}    
        })
       
    }
    catch(error)
     {console.log(error); res.status(500).json({msg:"No matching records found"})}
})
//update
router.put('/order/:id', async(req, res)=>
    {
        try {
            const id= req.params.id;
            const updateorder=req.body;
            await Product.findByIdAndUpdate({_id:id}, updateorder, {new:true})
            .then((updateorder)=>{
                console.log(updateorder); 
                res.status(200).json({msg:"Product is updated"});
                })
            .catch((error)=> {console.log(error);
                res.status(500).json({msg:"unable to update product"});
            })
            
        } 
        catch (error) {console.log(error); res.status(500).json({msg:"Unable to update new product"})
            
        }
    })
 //delete
router.delete('/order/:id', async(req, res)=>
    {
        try {
            const id= req.params.id;
            await Order.findByIdAndDelete({_id:id})
            .then((deletedorder)=>{
                console.log(deletedorder); 
                res.status(200).json({msg:"Product deleted"});
                })
            .catch((error)=> {console.log(error);
                res.status(500).json({msg:"Unable to delete product"});
            })
            
        } 
        catch (error) {console.log(error); res.status(500).json({msg:"Unable to delete product"})
            
        }
    })
       
    

module.exports=router;