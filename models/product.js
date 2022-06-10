const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    productName:String, 
    price:Number,
    description:String,
    imageUrl:String
})

module.exports = mongoose.model('Product', productSchema)