const express = require('express');
const Blog = require('../models/blogs');
const router = express.Router();
const Review = require('../models/reviews')



// Add new blog
router.get('/new', (req, res)=>{
    res.render('blogs/new')
})


// Show all the blog
router.get('/blogs', async(req, res)=>{
    const bg = await Blog.find({});
    res.render("blogs/index", {bg});
})
router.post('/blogs', async(req, res)=>{
    await Blog.create(req.body);
    res.redirect('/blogs')
})


// Show a particular blog
router.get('/blogs/:id', async(req, res)=>{
    const {id} = req.params;
    const blog = await Blog.findById(id).populate('review');
    res.render('blogs/show',{blog})
})


// Edit a particular blog
router.get('/blogs/:id/edit', async(req, res)=>{
    const editId= await Blog.findById(req.params.id);
    res.render('blogs/edit', {editId});    
});
router.patch('/blogs/:id', async(req, res)=>{
    await Blog.findByIdAndUpdate(req.params.id, req.body);
    // console.log(req.body);
    // res.send(" updated")
    res.redirect(`/blogs/${req.params.id}`);
});


// Delete a blog
router.delete('/blogs/:id', async(req, res)=>{    
    const id = await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/blogs');
});


// Comments for the particular blog
router.post('/blogs/:id/reviews', async(req, res)=>{
    // console.log(req.body);
    const blog = await Blog.findById(req.params.id)
    const review = new Review(req.body);

    blog.review.push(review);
    await blog.save();
    await review.save();
    
    res.redirect(`/blogs/${req.params.id}`)
})



module.exports= router;