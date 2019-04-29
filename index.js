const express = require('express');
const bodyParser = require("body-parser");
const fileManager = require('./fileManager');
const app = express()
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    let appStuff = fileManager.getApp(req.query.Name);
    if(appStuff === '')
        res.send('Not Found!');

    res.send(appStuff);
})

app.post('/', (req, res) => {
    console.log(req.body);
    res.send("Okay!");
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))