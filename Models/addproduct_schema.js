const { File } = require('buffer');
var mongoo=require('mongoose');


var userSchema= new mongoo.Schema({
   pfile:{
    type:String
    // require:true
},
pname:{
   type:String,
    reqiured:true
},
pdiscount:{
    type:String,
    required:true
},
pprice:{
    type:String,
    required:true
},
category:{
    type:String
},
quantity:{
    type:String,
    required:true
}
});

const productModel= mongoo.model('addproduct',userSchema)



module.exports=productModel