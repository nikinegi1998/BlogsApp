const mongoose = require('mongoose');
const Review =require('./reviews')

const blogSchema =  new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    img:{
        type: String
    },
    desc:{
        type: String
    },
    review:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
        
});

const Blog = mongoose.model('Blog',blogSchema)

module.exports = Blog;
