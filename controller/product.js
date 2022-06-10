const res = require('express/lib/response')
const Product = require('../models/product')
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId


exports.getAddProduct= (req,res)=>{

    res.render('add-product',
     {pageTitle:"Add product",
     path:"/admin/add-product"})

    
}

exports.postAddProduct=(req,res)=>{
    
    const product = new Product({productName: req.body.productName,
                                price:req.body.price,
                                descriptiom:req.body.description,
                                imageUrl:req.body.imageUrl})
    product.save()

    

    //products.push({productName:req.body.productName})
    res.redirect('/')
}

exports.getProducts = (req, res, next)=> {
     
    Product.find()
    .then(products=>{
        res.render('shop', 
    {pageTitle:"Shop", 
    products:products,path:"/"})
        
    })
    
 

   
    
}

exports.getProduct= (req,res)=>{
    
    const prodId = req.params.id
    Product.findById(prodId)
    .then(product=>{
        res.render('product_detail',{pageTitle:product.productName,
        product:product,path:'/'})
    })
}

exports.getEditProduct=(req,res)=>{
    
    const prodId = req.params.id
    
    Product.findById(prodId)
    .then(product=>{
        
        res.render('edit-product',{product:product,pageTitle:product.productName, path:null})
    })
}

exports.getpostEditProduct=(req,res)=>{
    const prodId = req.body.id
    const updatedName = req.body.productName
    const updatedPrice = req.body.price
    const updatedUrl = req.body.imageUrl
    const updatedDesc = req.body.description
    

    // const product = new Product(updatedName, updatedPrice,updatedDesc, updatedUrl, new mongodb.ObjectId(prodId))
    // console.log(product)
    // product.save()
    Product.findByIdAndUpdate(new ObjectId(prodId),{ 
        productName: updatedName,
        price:updatedPrice,
        description:updatedDesc,
        imageUrl:updatedUrl

    })

    .then(result=>{
        console.log('product updated')
        res.redirect('/')
    })

}

exports.postDeleteProduct=(req,res)=>{
    const prodId = req.body.id
    console.log('post',prodId)
    //Product.deleteById(prodId)
    Product.findByIdAndRemove(prodId)
    .then(()=>{console.log("product deleted")
    res.redirect('/')})
    .catch((err)=>{console.log(err)})


}