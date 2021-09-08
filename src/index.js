const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const mysql = require ('mysql');
const bodyParser = require('body-parser');

//const { extname } = require('path/posix');

//inicializaciones
const app = express();

//settings
app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views'))


app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs' ,
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');




//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());



//Global variables
app.use((req,res,next) => {
    
    next();
});

//Routes
app.use(require('./routes'));
app.use(require('./routes/autentication'));
app.use('/links', require('./routes/links'));

//Public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploadImages')));




//Start server

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})
