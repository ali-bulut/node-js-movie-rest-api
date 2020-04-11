const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const movieRoutes = require('./routes/movie-routes');
const adminRoutes = require('./routes/admin-routes');

const app=express();


app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));


app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/api/movies', movieRoutes);
app.use('/api/admins', adminRoutes);


//end of the routes
// app.use((req,res,next) => {
//     const error = new Error('Could not find this path!');
//     next(error);
// })

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds145415.mlab.com:45415/${process.env.DB_NAME}`, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true})
.then(() => {
    app.listen(process.env.PORT || 5000);
})
.catch((err) => {
    console.log(err);
})


