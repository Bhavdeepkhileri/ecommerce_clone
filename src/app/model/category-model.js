const mongoose = require('mongoose')


const CategorySchema = new mongoose.Schema({
    name: String,
    parent: {
      type: String,
      default: null,
      index: true
    },
    category:{
        type: String,
        index: true
    }
});

CategorySchema.index({ parent: 1, name: 1 });

const Category=mongoose.model('Category',CategorySchema);

module.exports= Category;