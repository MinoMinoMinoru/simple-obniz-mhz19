const { Mh_z19 } = require('./mh_z19');

var Obniz = require("obniz");
require('dotenv').config();

// set environment variables
const obnizID = process.env.OBNIZ_ID;

// initializing Instances
var obniz = new Obniz(obnizID);
var mh_z19 = new Mh_z19(obniz);

async function getDataLoop() {
    console.log("===== Start Get Data after 3 minutes =====")
    // we need 3 minutes for MH_Z19 to get first CO2 data
    await sleep(180000)
    while (true) {
        // we must to wait for MH_Z19 to get CO2 data
        await sleep(5000)

        let co2_value = await mh_z19.read_co2_concentration();
        console.log("co2_value:",co2_value);

        await sleep(3000)
    }
}

async function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}


getDataLoop()