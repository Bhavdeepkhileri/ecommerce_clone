const mongoose=require('mongoose');

// Exit application on error
mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});



exports.connect = (envConfig, env) => {
    // print mongoose logs in dev env
    if (env === 'development') {
        mongoose.set('debug', true);
    }
    mongoose.connect('mongodb://127.0.0.1:27017/ecommerce-clone-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    });
    return mongoose.connection;
};
