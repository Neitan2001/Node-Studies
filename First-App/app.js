const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


//express app
const app = express();

//Connect to mongoDB
const dbURI = 'mongodb+srv://neitan2001:lilicabonita123@nodestudies.qmt6r.mongodb.net/nodeStudies?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine

app.set('view engine', 'ejs');


//middleware & static files

app.use(express.static('public'));
app.use(morgan('dev'));


//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {

    res.render('about', { title: 'About' });
});

//blog create
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 }).then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result })
    }).catch((err) => {
        console.log(err);
    })
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
});

//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});