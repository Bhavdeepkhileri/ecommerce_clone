const express =require('express')
const userRoutes = require('./user');
const vendorRoutes = require('./vendor')


const router = express.Router();

router.use('/user', userRoutes);
router.use('/vendor', vendorRoutes);

module.exports = router;