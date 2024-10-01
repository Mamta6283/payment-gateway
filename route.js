const express=require('express')

const router=express.Router()
const obj_prd=require('./controller/ProductController')

//-----------These Libry For File Upload Any Type--------
const multer=require('multer') // Upload the Destination Location
const fs=require('fs')   // Handle The File Type and Read
const path=require('path')  // Find The Where you Want To Store
//---------------------End---------------------


// Set up Multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = './static/product_image';
        if (!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // unique file name (images or any kind of file)
    }
});  
const upload = multer({ storage: storage });


router.get('/',(req,res)=>{
    res.render('Home')
    res.end()
})

// router.get('/product-list',(req,res)=>{
//     res.render('Products')
//     res.end()
// })
router.use('/Add_Product',upload.single('photo'),(req,res)=>{
    
    obj_prd.Add_Product(req,res)
    
})
router.use('/product_list',(req,res)=>{
    obj_prd.Fetch_Products(req,res)
})
router.post('/update_records1',(req,res)=>{
    obj_prd.Buy_Products(req,res)
})
router.get('/success',(req,res)=>
    {
        obj_prd.Status(req,res)
    })
module.exports=router