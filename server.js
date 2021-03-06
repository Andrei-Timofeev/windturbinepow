var proxy = require('express-http-proxy');
const express = require("express");
const app = express();
const url = require('url');

const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({extended: false});


app.use('/service/*', proxy('http://rp5gis.myxomopx.ru', {
proxyReqPathResolver: req => url.parse(req.baseUrl).path
}));
app.use('/', express.static('./'));
app.listen(3000);