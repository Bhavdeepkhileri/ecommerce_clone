const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const vendorSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    IsDelete: {
        type: Boolean,
        default: false
    },
    img:
    {
        type: String,
        default: null
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

vendorSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString(),email:user.email }, 'secretkey')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

vendorSchema.statics.findByCredentials = async (email, password) => {
    const vendor = await Vendor.findOne({ email })

    if (!vendor) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, vendor.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return vendor
}

// Hash the plain text password before saving
vendorSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const Vendor = mongoose.model('Vendor',vendorSchema)

module.exports = Vendor;