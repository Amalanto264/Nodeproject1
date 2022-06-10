//const http = require('http');

const express = require('express');
//const mongoConnect = require('./utils/database').mongoConnect

const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const app = express()

const path = require('path')

const userRoutes = require('./routes/user')

const bodyParser = require('body-parser');
const {initializePassport} = require('./controller/passport')
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
//const nopageRoutes = require('./views/404.html')
//const router = require('./routes/admin');
const rootDir = require('./utils/path')

initializePassport(passport)

app.set('view engine','ejs')
app.set('views','views')

app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname,'public')))
app.use('/admin',adminRoutes)

app.use(shopRoutes)
app.use(userRoutes)
app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())



app.use((req,res)=>{
    //res.status(404).sendFile(path.join(rootDir,'views','404.html'))
    res.status(404).render(('404'),{pageTitle:'404 error', path:'error'})
})

// const server = http.createServer(app)

// server.listen(3000)

// mongoConnect(client =>{
//     console.log(client)
//     app.listen(3000,()=>{console.log("server is running on port 3000")})
// })

mongoose.connect("mongodb+srv://Amal:amal@cluster0.qxe4h.mongodb.net/market?retryWrites=true&w=majority")
.then(result=>{
    app.listen(3000,()=>{console.log("server is running on port 3000")})

}).catch(err=>{console.Console(err)})