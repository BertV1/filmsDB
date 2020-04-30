const express = require('express');
const https = require('https');
const app = express();
const fs = require('fs');



https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
    .listen('1337', '127.0.0.1', () => console.log('listing on leet'));


app.use(express.static('public'));