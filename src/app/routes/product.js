const express= require('express');
const {validate} = require('express-validation');
const authValidator =require('../validation/auth');
const Product =require('../model/product-model')
const auth = require('../../middleware/auth');
const router= new express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../public/upload/product-image'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }
  })
  var upload = multer({ storage: storage })

  router.post('/addItem',upload.single('img'),async(req,res)=>{
      try{
            req.body.userId=req.user._id;
            req.body.img=req.file.filename;
            const product = new Product(req.body);
            await product.save();
      }
      catch(err)
      {
            res.status(400).send({message: "cannot upload item detail",err});
      }
  });



  router.post('/deleteItem',auth,async (req,res)=>{
    /*
    deleting prodcut , changing isDelete flag to true
    */
   try{
    const itemDeleted = await Product.updateOne({_id:new mongoose.Types.ObjectId(req.body.productId)},{$set:{IsDelete:true}});
    console.log(itemDeleted);
    res.send({message:"item deleted"})
   }
   catch(e){
        res.status(400).send(e);
   }
})

router.post('/updateItem',auth,async (req,res)=>{
    /*
    updating prodcut
    */
   try{
    const updateItem = await Product.updateOne({_id:new mongoose.Types.ObjectId(req.body.productId)},{$set:{productName:req.body.productName,
    price: req.body.price,
    quantity: req.body.quantity}});
    res.send({message:"item updated"});
   }
   catch(e){
    res.status(400).send(e);
   }

})

module.exports=router;