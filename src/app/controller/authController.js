

exports.signup=function(User){
    return async(req,res)=>{
        try{
            const type = req.body.type;
            delete req.body.type;
            delete req.body.repeat_password;
            const user = new User(req.body);
            let savedUser = await user.save();
            res.status(201).send({message: "signup successful"});
        }
        catch(err)
        {
            console.log(err);
           if (err.name === 'MongoError' && err.code === 11000) {
            // Duplicate username
            return res.status(422).send({ message: 'User already exist!' });
          }
        }
        res.status(422).send({e});
    }
}

exports.login=function(User){
    return async (req,res)=>{
        try{
            const user = await User.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken()
            res.status(200).send({ token })
        }
        catch(e)
        {
            res.status(400).send({message:"email or password incorrect"})
        }
    }
}

exports.logout=async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
}

exports.logoutAll=async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
}