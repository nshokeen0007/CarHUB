const express=require('express')
const dotenv=require('dotenv');
const session=require('express-session')



dotenv.config({path:'./config.env'});
const app=express()
app.use(express.static('upload'))
app.use(express.static('views'))
app.use('/static',express.static('public'))
// const router=express.Router()

app.set('view engine','ejs')
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
// DATABASE 
require('./Db/mongoconnection')
let router=require("./Routes/Router")

// const authenticateToken = require('./views/middleware/authanticateToken');

// app.use(authenticateToken);
app.use(express.json());
app.use(
    session({
        secret:'iamdevagooddev',
        resave:false,
        saveUninitialized:false,
        cookie:{
              maxAge:2000000000
        }
    })
)



















const PORT=process.env.PORT

app.use('/',router)
app.listen(PORT),(()=>console.log(`Server is running on port ${PORT}`)) 