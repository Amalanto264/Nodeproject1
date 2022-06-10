const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = (callback)=>{

MongoClient.connect("mongodb+srv://Amal:amal@cluster0.qxe4h.mongodb.net/market?retryWrites=true&w=majority")
.then(client=>{
    console.log("connected")
    _db = client.db()
    callback()
})
.catch(err=>{
    console.log(err)
})
}

const getDb = ()=>{
    if(_db){
        return _db
    }

    throw 'No database found'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb
//module.exports = mongoConnect;