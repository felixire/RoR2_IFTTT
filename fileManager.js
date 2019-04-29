const fs = require("fs");
const filepath = "./Save.json";

let _Stuff = {};

(async() => {
    await getSavedStuff();
})()

//Returns empty string when not exists
async function getApp(appName){
    return new Promise(async(res, rej) => {
        let app = _Stuff[appName];

        console.log(_Stuff);
        if(!app || app == undefined || app == null){
            res('');
            return;
        }

        //Delete the data
        _Stuff[appName] = {};
        await saveStuff();
    
        res(app);
    })
}

async function getSavedStuff(){
    return new Promise(async(res, rej) => {
        fs.exists(filepath, async(exists) => {
            console.log("Exists?", exists);
            if(!exists)
                await saveStuff();
        })
    
        let rawData = fs.readFileSync(filepath);
        _Stuff = JSON.parse(rawData);
        console.log("Stuff:", _Stuff);
        res();
    })
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
    return new Promise(async(res, rej) => {
        let unix = new Date().getTime();
    
        if(_Stuff[appName] != undefined || _Stuff[appName] != null){
            //_Stuff[appName][data][unix] = value;
            _Stuff[appName][unix] = value;
            await saveStuff();
            res();
        }else{
            _Stuff[appName] = {};
            _Stuff[appName][unix] = value;
            await saveStuff();
            res();
        }
    })

}

module.exports = {getApp, getSavedStuff, saveStuff, setApp};