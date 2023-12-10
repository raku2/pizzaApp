const mongoose = require('mongoose');

module.exports = () => {
    mongoose
        .connect('mongodb+srv://rakesh:1995@cluster0.4v428hw.mongodb.net/?retryWrites=true&w=majority', {
            dbName: 'dbpiazza'
        })
        .then(() => {
            //if connection success callback
            console.log('MongoDB connected.....');
        })
        .catch((err) => console.log(err.message));

    mongoose.connection.on('connected', () => {
        console.log('Database connected');
    });
    mongoose.connection.on('error', (err) => console.log(err.message));
};