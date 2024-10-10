const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const port = 2400
const app = express();
const path = require("path")
const authRoute = require('./routes/userroutes');
const session = require('express-session');



require('dotenv').config();
app.use(express.static(path.join(__dirname, 'assets')))

app.use(cors())
app.use(session({
    secret: process.env.SESSION_SECRETE,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false, }
    
}));
app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({extended: true}));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
app.use('/api/auth',  authRoute);



app.get('/', (req,res)=> {
    res.render('form')
});

app.get('/index', (req,res)=> {
    res.render('index')
});




app.listen(port, ()=> {
    console.log(`server running at http://localhost:${port}`)
})



module.exports = app
