const fs = require("fs");
const filepath = "./Save.json";

let _Stuff = {};

(() => {
    _Stuff = getSavedStuff();
})()

//Returns empty string when not exists
async function getApp(appName){
    let app = _Stuff[appName];
    console.log(_Stuff);
    if(app === undefined || app === null)
        return '';

    
    //Delete the data
    _Stuff[appName] = {};
    await saveStuff();

    return app;
}

async function getSavedStuff(){
    fs.exists(filepath, async(exists) => {
        console.log("Exists?", exists);
        if(!exists)
            await saveStuff();
    })

    let rawData = await fs.readFileSync(filepath);
    _Stuff = JSON.parse(rawData);
    console.log("Stuff:",_Stuff);
}

function saveStuff(){
    return new Promise((res, rej) => {
        fs.writeFile(filepath, JSON.stringify(_Stuff), (err) => {
            if(err) throw err;

            res();
        })
    })
}

async function setApp(appName, value){
    let unix = new Date().getTime();

    if(!_Stuff[appName]){
        //_Stuff[appName][data][unix] = value;
        _Stuff[appName][unix] = value;
        await saveStuff();
    }else{
        _Stuff[appName] = {};
        _Stuff[appName][unix] = value;
        await saveStuff();
    }

}

module.exports = {getApp, getSavedStuff, saveStuff, setApp};