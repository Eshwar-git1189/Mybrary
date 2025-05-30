if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expessLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expessLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true // Corrected spelling
    //useUnifiedTopology: true // Recommended for better connection handling
});

const db = mongoose.connection
db.on('error',error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


app.use('/', indexRouter)
app.use('/authors', authorRouter)

app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server started on port ${process.env.PORT || 3000}`);
    
})
