
//const mongoConnect = require('../utils/database')
const getDb = require('../utils/database').getDb
const mongodb = require('mongodb')

module.exports = class Products{
    constructor(pname, price, description, imageurl,id){
        this.productName = pname;
        this.price = price;
        this.description = description;
        this.imageUrl = imageurl;
        this._id = id

    }

    save(){
        const db = getDb()
        let dbop
        if(this._id){
            console.log('model',this._id)
            dbop = db.collection('products')
            .updateOne({_id:new mongodb.ObjectId(this._id)},{$set:this})
        }else{
            dbop = db.collection('products')
            .insertOne(this)
        }

        return dbop
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }


 static fetchAll(){
    const db = getDb()
    return db.collection('products').find().toArray()
    .then(products =>{return products})
    .catch(err=>{console.log(err)})
}

static findById(prodId){

    
    const db = getDb()
    return db.collection('products')
    .findOne({_id: new mongodb.ObjectId(prodId) })
    .then(product=>{return product})
    
}

static deleteById(prodId) {
    const db = getDb()
    return db.collection('products')
    .deleteOne({_id: new mongodb.ObjectId(prodId)})
    .then(res=>{console.log("product deleted succsfully")})
    .catch(err=>{console.log(err)})
}
}

// const products = []
// module.exports = class Product{
//     constructor(p){
//         this.productName = p
//     }
//     save(){
//         products.push(this)
//     }

//     static fetchAll(){
//         return products
//     }
// }