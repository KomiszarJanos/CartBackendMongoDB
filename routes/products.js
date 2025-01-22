const express= require('express');
const router= express.Router();
const Product= require('../models/products');


//post new
router.post('/products', async(req, res)=>
{
    try {
        const newProduct= new Product(req.body);
        await newProduct.save()
        .then((savedproduct)=>{
            console.log(savedproduct); res.status(201).json({msg:"New product is saved"})
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
router.get('/products', async(req, res)=>{
    try {
        Product.find()
       .then(products=>{console.log(products);
        res.status(200).json({products:products});
       //res.status(201).json({msg:"here are the products"}); 
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
        await Product.find(
        { name:searchMongos}
       )
       .then((products)=>{
        if(products.length) {
        console.log(products);
        res.status(200).json({products:products});} 
        else {res.status(200).json({products:products, msg:'there is no match'}); console.log("no match");}    
        })
       
    }
    catch(error)
     {console.log(error); res.status(500).json({msg:"No matching records found"})}
})
//update
router.put('/products/:id', async(req, res)=>
    {
        try {
            const id= req.params.id;
            const updateproduct=req.body;
            await Product.findByIdAndUpdate({_id:id}, updateproduct, {new:true})
            .then((updatedproduct)=>{
                console.log(updatedproduct); 
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
router.delete('/products/:id', async(req, res)=>
    {
        try {
            const id= req.params.id;
            await Product.findByIdAndDelete({_id:id})
            .then((deletedproduct)=>{
                console.log(deletedproduct); 
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