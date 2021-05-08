const express = require('express');
const app =  express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const seedDb = require('./seed');
const blogRoutes = require('./routes/blogs')

// seedDb();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/views'));


// middlewares
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));



// DATABASE CONNECTION
mongoose.connect('mongodb://localhost:27017/BlogsApp', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify:false
})
    .then(()=>{
        console.log("Database connected");
    })
    .catch((err)=>{
        console.log("error connecting the database");
    })



// Landing page
app.get('/', (req, res)=>{
    res.render('blogs/home');
})

app.use(blogRoutes);


app.listen(3000, ()=>{
    console.log("Server running");
})