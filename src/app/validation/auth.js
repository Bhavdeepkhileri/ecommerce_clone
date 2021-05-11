const Joi = require('joi');

module.exports= {

    // POST /signup
    signup: {
      body: Joi.object({
            name:Joi.string().min(3).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{3,}$')),
            repeat_password: Joi.ref('password'),
            email: Joi.string().email().required(),

      })

    },


    login: {
      body: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
      }
    }

}