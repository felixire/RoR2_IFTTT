const fs = require("fs");
const filepath = "./Save.json";

let _Stuff = {};

(() => {
    _Stuff = getSavedStuff();
})()

//Returns empty string when not exists
function getApp(appName){
    let app = _Stuff[appName];
    console.log(_Stuff);
    if(app === undefined || app === null)
        return '';

    return app;
}

async function getSavedStuff(){
    fs.exists(filepath, async(exists) => {
        if(!exists)
            await saveStuff();
    })

    fs.readFile(filepath, async(err, data) => {
        if(err) throw err;

        if(data != '')
            _Stuff = JSON.parse(data);
        else
            await saveStuff();
    })
}

function saveStuff(){
    return new Promise((res, rej) => {
        fs.writeFileSync(filepath, JSON.stringify(_Stuff), (err) => {
            if(err) throw err;

            res();
        })
    })
}

async function setApp(appName, value){
    let unix = new Date().getTime();

    if(getApp(appName) != ''){
        //_Stuff[appName][data][unix] = value;
        _Stuff[appName][unix] = value;
        await saveStuff();
    }

}

module.exports = {getApp, getSavedStuff, saveStuff, setApp};