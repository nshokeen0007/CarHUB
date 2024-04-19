const router=require('express').Router();
const multer=require('multer')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const authenticateToken = require('../views/middleware/authanticateToken');




// signup schema
const USERDATA=require('../Models/singup_schema')

//add product schema
const Addpro=require('../Models/addproduct_schema')








router.get('/',(req,res)=>{
    res.render('index')
   })
   
   
   
   router.get('/login',(req,res)=>{
       res.render('login')
   })
   
   
   router.post('/login',async(req,res)=>{
       const email=req.body.email;
       const password=req.body.password;
       console.log('hit')
   
       try{
           const user=await USERDATA.findOne({email:email})
           .exec()
           console.log(user)
           
           if(user){
              const matchpass=await bcrypt.compare(password,user.password)
              if(!matchpass){
               res.redirect('/login')
              }else{
                const token = jwt.sign({ userId: user._id }, 'NikhilDagame', { expiresIn: '1h' });
               console.log(token,'mm')
               res.setHeader('Authorization', `Bearer ${token}`);
   
               console.log('login successful')  
          
           }
           }
          req.session.user=user
          res.redirect('/admin')
   
   
       }catch(err){
        console.log(err);
           throw err
       }
   })
   
   router.get('/signup',authenticateToken,(req,res)=>{
       res.render('signup')
   })
   
   router.post('/signup',async(req,res)=>{
       const{email,password}=req.body;
   
    const user=await new USERDATA({email,password})
    user.save()
    if(user){
       console.log('data send successfull')
       res.redirect('/login')
    }
    else{
   console.log(err)
    }
   
   })
   
   
   
   
   
   
   
   router.get('/admin',(req,res)=>{
       if(req.session.user){
       res.render('dashboard/index2')
       }else{
           res.redirect('/login')
       }
   
   })
   
   
   
   router.get('/addproduct',(req,res)=>{
       if(req.session.user){
       res.render('dashboard/addproduct')
       }else{
           res.send('<script>alert("Please login first");window.open("/login","_self")</script>')
       }
   })
   
   
   
   const storage=multer.diskStorage({
       destination:(req,file,cb)=>{
           cb(null,'../SIRPROJECT/upload')
       },
       filename:(req,file,cb)=>{
           cb(null,file.originalname)
       }
   })
   const fileFilter=(req,file,cb)=>{
       const allowedfileType=['image/jpeg','image/jpg','image/png']
       if(allowedfileType.includes(file.mimetype)){
           cb(null,true)
       }else{
           cb(null,false)
       }
   }
   
   
   
   const upload=multer({storage,fileFilter})
   
       
   
   router.post('/addproduct',upload.single('pfile'),async(req,res)=>{
    try{
           const pfile=req.file.filename;
           const{pname,pdiscount,pprice,category,quantity}=req.body;
   
           const user=new Addpro({pfile,pname,pdiscount,pprice,category,quantity})
           const savedata=await user.save()
           if(savedata){
               // console.log('product add successful')
               res.send('<script>alert("Product Add successfully");window.open("/admin", "_self");</script>')
   
           }else{
               res.redirect('/')
           }
   
       }catch(err){
           console.log(err)
       }
   })
   
   
   
   
   router.get('/viewdata',async(req,res)=>{
    try{
       if(req.session.user){
       const data=await Addpro.find();
       res.render('dashboard/viewdata',{data:data})
       }else{
           res.send('<script>alert("please login first");window.open("/login","_self")</script>')
       }
    }catch(err){console.log(err)}
   })
   
   
   
   router.get('/edit/:id',async(req,res)=>{
       try{
    
       const data=await Addpro.findById(req.params.id);
    
       console.log(data);
       res.render('dashboard/addpro_edit',{data:data})
       }
       catch(err){
        console.log(err)
       //  res.render('dashboard/addpro_edit')
       }
       
    });
   
   
    router.post('/edit/:id',upload.single('pfile'),async(req,res)=>{
       try{
           const updateViewdata={
               pfile:req.body.pfile,
               pname:req.body.pname,
               pdiscount:req.body.pdiscount,
               pprice:req.body.pprice,
               category:req.body.category,
              quantity:req.body.quantity
              
           };
           if (req.file) {
             
               updateViewdata.pfile = req.file.filename;
         
          
             }
           const data= await Addpro.findByIdAndUpdate(req.params.id, updateViewdata)
           console.log(data)
         
           res.redirect('/viewdata')
       }
       catch(err){
        console.log(err)
       
       }
           })
   
   
       router.get('/delete/:id',async(req,res)=>{
           try{
               const user=await Addpro.findByIdAndRemove(req.params.id)
               console.log('deleted data'+user)
               if(user){
                   res.redirect('/viewdata')
               }
           }catch(err){
               console.log(err)
           }
   
       })
   
   
   router.get('/viewcategory',(req,res)=>{
       if(req.session.user){
       res.render('dashboard/view_category')}
       // else {
       //     const alertMessage = "Please login first";
       //     const redirectUrl = "/login";
       //     const htmlResponse = `
       //         <script>
       //             alert('${alertMessage}');
       //             window.location.href = '${redirectUrl}';
       //         </script>
       //     `;
       //     res.send(htmlResponse);}
   
   
   
   
       else{
    res.send('<script>alert("Please login first");window.open("/login", "_self");</script>')
   
       }
   })
   
   
   
   router.get('/honda',async(req,res)=>{
      try{
       const user=await Addpro.find({category:'honda'})
       if(user){
           res.render('dashboard/honda',{data:user})
       }
      }catch(err){
   console.log(err)
      }
   })
   
   router.get('/maruti',async(req,res)=>{
       try{
           const user=await Addpro.find({category:'maruti'})
           if(user){
               res.render('dashboard/maruti',{data:user})
           }
       }catch(err){
           console.log(err)
       }
   })
   router.get('/skoda',async(req,res)=>{
       try{
           const user=await Addpro.find({category:'skoda'})
           if(user){
               res.render('dashboard/skoda',{data:user})
           }
       }catch(err){
           console.log(err)
       }
   })
   
   
   
   
   router.get('/logout', (req, res) => {
       req.session.destroy((err) => {
           if (err) {
               console.log(err);
           }
           res.clearCookie('connect.sid');
           res.send('<script>alert("You logout successfull");window.open("/login", "_self");</script>');
       });
   });



router.post('/checkData', async (req, res) => {
    try {
        const data = req.body.data;

 console.log(data,'data')
        const result = await USERDATA.findOne({ email: data });

     
        res.json({ exists: !!result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/resetPass',async(req,res)=>{
    try{
        res.render( 'reset_password')  ;
    }catch(err){
        throw err
    }
})

















module.exports=router;