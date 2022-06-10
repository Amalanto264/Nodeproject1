const User = require('../models/user')
const Product = require('../models/product')
const bcrypt = require('bcrypt')



exports.loginuser = (req,res)=>{
    res.render('login',{pageTitle:'User Login',path:'/'})
    


}

exports.postLogin = (req,res)=>{
    const userData = req.body
    User.findOne({email:req.body.email, password:req.body.password},(err,user)=>{
        if(err) throw error
        if(!user){
            console.log('invalid user')
            res.render('register',{pageTitle:'User Register', path:'/'})
        }else{

            Product.find()
            .then(products =>{
                console.log(products)
                res.render('shop', {pageTitle:'Shop',products:products, path:'/'})
            })
            
        }
        
    })

}

exports.registeruser = (req,res)=>{
    
    res.render('register',{pageTitle:'User Registration', path:'/'})


}

exports.postRegister = async (req,res)=>{
    let email = req.body.email
    //let password = req.body.password

    let password = await bcrypt.hash(req.body.password,10)

    const user = new User({email:email, password:password})

    user.save((err, registeredUser)=>{
        if(err) throw error
        console.log(registeredUser)

        res.render('login',{pageTitle:'User Login', path:'/'})
    })
}
