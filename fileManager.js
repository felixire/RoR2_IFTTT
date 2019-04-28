const fs = require("fs");
const filepath = "./Save.json";

let _Stuff = {};

(() => {
    _Stuff = getSavedStuff();
})()

//Returns empty string when not exists
function getApp(appName){
    let app = _Stuff[appName];
    if(app === undefined || app === null)
        return '';

    return app;
}

function getSavedStuff(){
    fs.exists(filepath, (exists) => {
        if(!exists)
            saveStuff();
    })

    fs.readFile(filepath, (err, data) => {
        if(err) throw err;

        if(data != '')
            _Stuff = JSON.parse(data);
        else
            saveStuff();
    })
}

function saveStuff(){
    fs.writeFile(filepath, JSON.stringify(_Stuff), (err) => {
        if(err) throw err;
    })
}

function setApp(appName, value){
    let unix = new Date().getTime();

    if(getApp(appName) != ''){
        _Stuff[appName][data][unix] = value;
    }

}

module.exports = {getApp, getSavedStuff, saveStuff, setApp};