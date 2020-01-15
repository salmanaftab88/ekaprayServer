let mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://salmanaftab88:Imjustforyou1239@cluster0-dfqyn.mongodb.net/ekapray?retryWrites=true&w=majority', function (err, connection) {
    if (err) {
        console.log(err);   
    }
    else {
        console.log(connection);
    }
});

// let mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://faisal:faisal908@ds343217.mlab.com:43217/ekapray', function (err, connection) {
//     if (err) {
//         console.log(err);   
//     }
//     else {
//         console.log(connection);
//     }
// });

// let mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/BrandClothing', function (err, connection) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(connection);
//     }
// });