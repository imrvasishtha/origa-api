const mongoose = require('mongoose');

/* try to connect mongodb altas */
    /*Internet connection required */
try {
    mongoose.connect('mongodb+srv://altasuser:altasuser@cluster0-bhee6.mongodb.net/origa?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if(err) {}
        console.error.bind(console, "error while connecting with database");
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log("we are connected");
    });
} catch (err){
    console.log("error while connecting with database: may be internet connecton error");
}
module.exports = mongoose;