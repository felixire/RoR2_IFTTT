const express = require('express');
const bodyParser = require("body-parser");
const fileManager = require('./fileManager');
const app = express()
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async(req, res) => {
    let appStuff = await fileManager.getApp(req.query.Name);
    if(appStuff === ''){
        res.send('Not Found!');
        return;
    }

    res.send(appStuff);
})

app.post('/', (req, res) => {
    console.log("-----");
    console.log(req.body);
    console.log("-----");
    if(!req.body.Name || !req.body.Info){
        res.send("Please specify a Name and Info");
        return;
    }

    fileManager.setApp(req.body.Name, req.body.Info);

    res.send("Okay!");
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))