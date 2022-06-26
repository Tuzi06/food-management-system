const { urlencoded } = require('express');
const express = require('express')
const app = express()
const routes = require('./routes/routes');
const routesCart = require('./routes/routes-carts');

app.use('/',express.urlencoded({extended: false}));
app.use('/',express.json());
app.use('/', routes);
app.use('/carts', routesCart);


app.listen(5000,(err,res) => {
    console.log("The server is on.......")

    if (err){
        res.end()
    }
});