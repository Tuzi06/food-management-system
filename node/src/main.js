const express = require('express')
const app = express()
const routes = require('./routes');

app.use('/',express.urlencoded({extended: false}));
app.use('/',express.json());
app.use('/', routes);



app.listen(5000,(err,res) => {
    console.log("The server is on.......")
    if (err){
        res.end()
    }
});