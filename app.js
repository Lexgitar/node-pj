const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const blogRoutes = require('./routes/blogRoutes')



const app = express()

//connect to mongoDB
const dbURI = 'mongodb+srv://netninja:test4321@nodetuts.briyjwt.mongodb.net/nodetuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(result=> app.listen(3000))
.catch((err)=> console.log(err))

//reg view engine
app.set('view engine', 'ejs')
//app.set('views', 'myviews')

// app.use((req, res, next)=>{
//     console.log('new req was made')
//     next()
// })
//middleware and static files
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res)=>{
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my',
        body: 'more abuua gafsgs'
    })

    blog.save()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
})

app.get('/all-blogs', (req, res) =>{
    Blog.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.get('/single-blog', (req, res)=>{
    Blog.findById("648f2c604305efafe7f72b13")
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})

//routes
app.get('/', (req, res)=>{
    //res.send('<p>home page</p>')
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   ];

    // res.render('index', { title:'Home', blogs})
    res.redirect('/blogs')
})

app.get('/about', (req, res)=>{
    //res.send('<p>about page</p>')
    //res.sendFile('./views/about.html', {root: __dirname})
    res.render('about' , { title:'About'})
})

// redirects
// app.get('/about-us', (req, res)=>{
//     res.redirect('/about')
// })


//blog routes

app.use('/blogs', blogRoutes)

//404 page
app.use((req, res)=>{
//res.status(404).sendFile('./views/404.html', {root: __dirname})
res.status(404).render('404', { title:'404'})
})