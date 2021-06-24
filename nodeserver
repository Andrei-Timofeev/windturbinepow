
var proxy = require('express-http-proxy');
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use('/rp5gis', proxy('http://rp5gis.myxomopx.ru/'));
app.use('/', express.static('./'));
app.listen(3000);
