const Router=require('express').Router();
const multer=require('multer')
const bcrypt=require('bcryptjs')


// DATABASE 
require('./Db/mongoconnection')

// signup schema
const USERDATA=require('../Models/singup_schema')

//add product schema
const Addpro=require('../Models/addproduct_schema')































module.exports=Router