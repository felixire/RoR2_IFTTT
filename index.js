const express = require('express')
const fileManager = require('./fileManager');
const app = express()
const port = 8080

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

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))