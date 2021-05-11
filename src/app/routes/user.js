const express= require('express');
const {validate} = require('express-validation');
const authValidator =require('../validation/auth');
const User =require('../model/user-model')
const Vendor =require('../model/vendor-model')
const auth = require('../../middleware/auth');
const authController = require('../controller/authController');

const router= new express.Router();

router.post('/signup',validate(authValidator.signup), authController.signup(User));
router.post('/login',authController.login(User));
router.post('/logout', auth(User), authController.logout)
router.post('/logoutAll', auth(User), authController.logoutAll)

router.post('/changePassword',auth,async(req,res)=>{
    try{
        const isMatch = await bcrypt.compare(req.user.password, req.body.password);
        if(!isMatch) 
            throw new Error('not match');
        user.password= req.new_password;
        await req.user.save();
    }
    catch(e){
        if(e=="match password")
            return res.status(400).send({message:"incorrect password"});
        res.status(400).send({message: "cannot change the password"})
    }
});



module.exports =router;