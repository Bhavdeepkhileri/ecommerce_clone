const express= require('express');
const cors=require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const path=require('path');
const mongoose = require( './config/mongoose');
const routes = require('./app/routes/index');
const environment=require('../environment')


const env = process.env.NODE_ENV;
console.log(environment[env]);
// getting application config based on environment
const envConfig = environment[env];

// setting port value
const PORT = envConfig.port || 3000;

const app = express();

// open mongoose connection
mongoose.connect(envConfig, env);

app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.use(cors());

// mount api routes
app.use('/', routes);

app.listen(PORT,()=>{
    console.log('server is running');
});

