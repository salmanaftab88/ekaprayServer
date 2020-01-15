let express = require('express');
let bdy = require('body-parser');
let mongoose = require('mongoose');
require('./db/models/config');
let User = require('./db/models/UserSchema');
let userRoutes = require('./routes/router');
const path = require('path');
// require(http);
const http = require('http');
let app = express();
app.use(bdy.urlencoded());
app.use(bdy.json());

app.use(express.static('./build'));
app.use(express.static('./uploads'));
app.use('/', userRoutes);
// app.use(express.static('./server'));
app.get('*', function (req, res, next) {
    res.sendFile(path.resolve(__dirname,'./build/index.html'));
});
// app.use(express.static('./'))

//Set Port
const port = process.env.PORT || '5000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));


// app.listen(process.env.PORT || 5000, ()=>{
//     console.log('server started');
// });