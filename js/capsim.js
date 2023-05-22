//  GLOBALS
var g_pinCt = 0;
//var g_lopCt = 0;
var g_position = null;

var g_cxnst = 0;                // Connection State: 0=NOT CONNECTED, 1=Connected to CAPSIM, 2=connected to CACTUS
var g_capid = 0;                // CAPID of user of this app.

var g_sortie_rid = 0;           //  ics204.rid  CACTUS sortie PK
var g_sortie_type = 'A';        //  air, ground, sUAS, UDF
var g_mission_num = '';         //  CACTUS mission number
var g_mission_rid = 0;          //  CACTUS mission.rid
var g_sortie = '';              //  CACTUS sortie number (from WMIRS)
//var g_callsign = '';            //  aircraft/vehicle callsign as it appears in CACTUS ICS204
var g_mission_list = null;      //  list of missions returned from CACTUS.

var g_messages = null;  	    // table of messages from CACTUS CAPF110 for display on Messages Tab.
//var g_lops = null;	    	    // array of LOPs for local plotting
var g_outboundmessages = null;	// array of messages pending transfer to CACTUS
//var g_outboundLOPs = null;	    // array of LOPs pending transfer to CACTUS
var g_capf104a = null;		    // CAPF104a object
var g_capf109 = null;		    // CAPF109 object
var g_ics214 = null;		    // ics214 object

// var g_positions = null;      // a collection of Location positions or coords.  Start collecting positions on "ARV" button, stop on "RTB" button.
//                              // add method to export to .kml



function openCity(evt, cityName) {
    // Declare all variables
    let i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab

    document.getElementById(cityName).style.display = "block";

    if (evt != null) {
        evt.currentTarget.className += " active";
    }

}





/*        function truncateCapid() {


            //  get HTML table for Messages
            let dt = document.getElementById('capid');


            if (dt != null) {
                dt.value = 0;
            }
            g_capid = 0;
            localStorage.setItem('g_capid', g_capid);
            console.log(`truncateCapid() : g_capid: ${g_capid}`);
        }*/


function truncateMessageList() {

    //  remove all the rows in the table.

    //  get HTML table for Messages
    let dt = document.getElementById('msgTbl');

    if (dt != null) {

        //  if rowcounts are different, then clear table.  write rows to table.
        // remove all rows (except TH) from table.
        while (dt.rows.length > 1) {
            //  https://www.w3schools.com/jsref/met_table_deleterow.asp
            dt.deleteRow(-1);
        }
    }
    console.log("truncateMessageList()");
}

function OnChangeCapid(id) {

    if (id == null) {
        g_capid = 0;
    }
    else {
        g_capid = id.value;
    }
    localStorage.setItem('g_capid', g_capid);
    console.log(`g_capid: ${g_capid}`);
    truncateMessageList();
}

function OnChangeSortie_type(id) {

    if (id != null) {
        g_sortie_type = id.value;
    }
    console.log(`g_sortie_type: ${g_sortie_type}`);


    if (g_sortie_type == null || g_sortie_type == 'A') {
        document.getElementById("btn4").hidden = false;      // CAPF104a P1
        document.getElementById("btn5").hidden = false;       // CAPF104a P2

        document.getElementById("btn2").hidden = true;     // CAPF109 P1
        document.getElementById("btn3").hidden = true;     // CAPF109 P2
        document.getElementById("btn6").hidden = true;      // ICS214
    }
    else {
        document.getElementById("btn4").hidden = true;      // CAPF104a P1
        document.getElementById("btn5").hidden = true;       // CAPF104a P2

        document.getElementById("btn2").hidden = false;     // CAPF109 P1
        document.getElementById("btn3").hidden = false;     // CAPF109 P2
        document.getElementById("btn6").hidden = false;     // ICS214
    }
    localStorage.setItem('g_sortie_type', g_sortie_type);
    console.log(`g_sortie_type: ${g_sortie_type}`);
    truncateMessageList();
    //truncateCapid();
}

function SetMissionNum(mission_num) {

    document.getElementById("mission_num").value = mission_num;
    localStorage.setItem('g_mission_num', mission_num);
    g_mission_num = mission_num
    console.log(`g_mission_num: ${g_mission_num}`);
    truncateMessageList();
    //truncateCapid();
}

function OnChangeMission_rid(id) {

    if (id == null) {
        g_mission_rid = 0;
    }
    else {
        g_mission_rid = id.value;

        // copy number to Mission_num
        //  would this be useful for latter disconnected startup?
        if (g_mission_list != null && g_mission_list.length > 0) {
            for (let i = 0; i < g_mission_list.length; i++) {

                let mission_num = g_mission_list[i].Mission_Num;
                let mission_rid = g_mission_list[i].Mission_rid;

                if (mission_rid == g_mission_rid) {
                    SetMissionNum(mission_num);
                }
            }
        }


    }
    localStorage.setItem('g_mission_rid', g_mission_rid);
    console.log(`g_mission_rid: ${g_mission_rid}`);
    truncateMessageList();
    //truncateCapid();
}

function OnChangeSortie_number(id) {

    if (id == null) {
        g_sortie = 0;
    }
    else {
        g_sortie = id.value;
    }
    localStorage.setItem('g_sortie', g_sortie);
    console.log(`g_sortie: ${g_sortie}`);
    truncateMessageList();
    //truncateCapid();
}

/*        function OnChangeCallsign(id) {

            if (id != null) {
                g_callsign = id.value;
            }
            localStorage.setItem('g_callsign', g_callsign);
            console.log(`g_callsign: ${g_callsign}`);
    truncateMessageList();
        }
*/


function OnChangeMission_num(id) {

    if (id != null) {
        //g_mission_num = id.value;
        SetMissionNum(id.value);
    }
    truncateMessageList();
    //truncateCapid();
}

function toSystemLog(funct_name, msg) {

    if (msg != null && msg.trim().length > 0) {
        console.log("TODO: write to file: [" + msg + "]");
    }
}

function CoordFmt(n) {

    n = Math.abs(n);

    let deg = Math.floor(n);
    let decMin = ((n - deg) * 60).toFixed(4);

    let s = deg.toString() + "° " + decMin + "'";

    return s;
}

const x = document.getElementById("coords");
//const dbt = document.getElementById("debugTxt");




function GeoLocationSuccess(pos) {

    //  https://www.w3schools.com/js/js_api_geolocation.asp
    g_position = pos;

    //const crd = pos.coords;
    console.log(pos.coords);

    if (pos != null && pos.coords != null) {
        let lat = pos.coords.latitude;
        let lng = pos.coords.longitude;
        let acc = pos.coords.accuracy;
        let alt = pos.coords.altitude;
        let trk = pos.coords.heading;
        let spd = pos.coords.speed;
        let tim = pos.timestamp;

        console.log(`lat=${lat}, lng=${lng}, acc=${acc}, alt=${alt}, trk=${trk}, spd=${spd}, tim=${tim}`);
        //console.log(JSON.stringify(pos));
        //;
    }
    else {
        console.log('position is null')
    }

    document.getElementById("coords").innerHTML = 'N' + CoordFmt(g_position.coords.latitude) + '&nbsp;&nbsp;W' + CoordFmt(g_position.coords.longitude);
}

function GeoLocationError(err) {
    console.error(`ERROR(${err.code}): ${err.message}`);
}


function startGeoLocationWatcher() {


    options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    navigator.geolocation.watchPosition(GeoLocationSuccess, GeoLocationError, options);

}

function startTime() {
    (function () {
        function checkTime(i) {
            return (i < 10) ? "0" + i : i;
        }

        function startTime() {
            let today = new Date(),
                h = checkTime(today.getUTCHours()),
                m = checkTime(today.getUTCMinutes()),
                s = checkTime(today.getUTCSeconds());
            document.getElementById('timeid').innerHTML = h + ":" + m + ":" + s + "z";
            t = setTimeout(function () {
                startTime()
            }, 500);

            // getLocation();
        }
        startTime();
    })();

}



function getHrMin() {

    let today = new Date(),
        h = checkTime(today.getUTCHours()),
        m = checkTime(today.getUTCMinutes()),
        s = checkTime(today.getUTCSeconds());

    let now = h + ":" + m + "z";

    return now;
}

function getHrMinSec() {

    let today = new Date(),
        h = checkTime(today.getUTCHours()),
        m = checkTime(today.getUTCMinutes()),
        s = checkTime(today.getUTCSeconds());

    let now = h + ":" + m + ":" + s + "z";

    return now;
}

function toCAPF104a(msg) {
    if (msg != null) {
        console.log('CAPF104a' + msg);
        // TODO: CAPF104a

    }
}

function validateConfig() {

    if (g_capid == null || g_capid < 100000 || g_capid > 700000) {
        console.log('OOPS - Enter your CAP ID on Config Tab.');
        alert('OOPS - Enter your CAP ID on Config Tab.');
        return false;
    }

    if (g_sortie == 0) {
        console.log('OOPS - Choose sortie number on Config Tab.');
        alert('OOPS - Choose sortie number on Config Tab.');
        return false;
    }

    if (g_mission_rid <= 0 && g_mission_num.trim().length == 0) {
        console.log('OOPS - Choose Mission or Mission Num on Config Tab.');
        alert('OOPS - Choose Mission or Mission Num on Config Tab.');
        return false;
    }

    if (g_sortie_type == null || (g_sortie_type != 'A' && g_sortie_type != 'G' && g_sortie_type != 'U')) {
        console.log('OOPS - Choose Sortie Type on Config Tab.');
        alert('OOPS - Choose Sortie Type on Config Tab.');
        return false;
    }

    return true;
}

async function toCACTUS(msg, callsign) {
    if (msg != null) {
        console.log('to CACTUS' + msg);
        toCAPF104a(msg);
        // TODO: CACTUS (or queue)

        SendToAzureQ(msg, callsign);

    }
}

function LOG() {

    const dbt = document.getElementById("debugTxt");
    dbt.innerText = "";

    let remarks = document.getElementById("remarks");

    let msg = 'TO CAPF104a: tablet123: ' + getHrMin() + ' ' + remarks.value
    dbt.innerText = msg;
    toCAPF104a(msg)

    document.getElementById("remarks").value = "";

}

/*
function LOP() {

    //  https://www.w3schools.com/js/js_api_geolocation.asp

    g_lopCt++;  // increment the global LOP counter

    const dbt = document.getElementById("debugTxt");
    dbt.innerText = "";
    let x = document.getElementById("remarks");


    try {

        if (g_position != null) {
            let coords = g_position.coords;

            if (coords != null) {

                let lat = coords.latitude;
                let lng = coords.longitude;
                let acc = coords.accuracy;
                let alt = coords.altitude;     // meters MSL
                let alt_acc = coords.altitudeAccuracy;
                let heading = coords.heading;
                let speed = coords.speed;      // meters per second

                //console.log(`latitude               = ${lat}`);
                //console.log(`longitude              = ${lng}`);
                //console.log(`accuracy               = ${acc}`);
                //console.log(`altitude               = ${alt} meters MSL`);
                //console.log(`altitude accuracy      = ${alt_acc}`);
                //console.log(`heading                = ${heading}`);
                //console.log(`speed                  = ${speed} meters per second`);

                let remarks = x.value;

                let remark0 = "lop #" + g_lopCt + ", " + getHrMin();

                if (heading != null) {
                    remark0 += ", " + heading.toFixed(0);
                }
                else {
                    remark0 += ", ";
                }

                remark0 += ", " + lat.toFixed(4) + ", " + lng.toFixed(4);

                if (alt != null) {
                    remark0 += ", " + alt.toFixed(0);
                }
                else {
                    remark0 += ", ";
                }

                remark0 += ", " + x.value;


                //console.log(remark0);
                toCACTUS(remark0);

                dbt.innerText = remark0;
                x.value = "";
            }


        }
        else {

            // since no location information prompt user for LOP data
            dbt.innerText = getHrMin() + " Since no location information prompt user for LOP data";
        }


        //let descr = "Enter pin discription: ( " + g_pinCt + ": " + x.innerText + " " + getHrMin() + " )";
        //let descr = "Enter pin discription: ( " + remark0 + " )";
        //let remarks = prompt(descr, "");
        //console.log(remark0 + ' ' + remarks);

        //  TODO: put into log
        //  TODO: send to CACTUS
        //  TODO: plot on tab:Plot

    }
    catch (ex) {
        dbt.innerText = ex.message;

        toSystemLog('LOP', msg);
    }

}
*/

/*
function pin_drop() {

    g_pinCt++;  // increment the global pin counter
    const dbt = document.getElementById("debugTxt");
    dbt.innerText = "";
    //  let x = document.getElementById("remarks");

    try {

        if (g_position != null) {

            let coords = g_position.coords;

            if (coords != null) {

                let lat = coords.latitude;
                let lng = coords.longitude;
                let acc = coords.accuracy;
                let alt = coords.altitude;     // meters MSL
                let alt_acc = coords.altitudeAccuracy;
                let heading = coords.heading;
                let speed = coords.speed;      // meters per second


                let remark0 = "TO CACTUS and CAPF104a: Pin# " + g_pinCt + ": " + lat.toFixed(4) + "," + lng.toFixed(4) + ", " + getHrMin();

                let descr = "Enter pin description: ( " + remark0 + " )";

                let remarks = prompt(descr, "");
                let msg = remark0 + ' ' + remarks;
                dbt.innerText = msg;

                toCAPF104a(msg);
            }
        }
        else {

            // since no location information prompt user for LOP data

            let remark0 = "Pin# " + g_pinCt + ": "; //" + getHrMin();

            let descr = "Enter pin description (lat, lng, alt ...): ( " + remark0 + " )";

            let remarks = prompt(descr, "");
            dbt.innerText = "TO CAPF104a " + remark0 + ' ' + remarks;

            let msg = remark0 + ' ' + remarks;

            toCAPF104a(msg);

            // TODO: put into log
        }

    }
    catch (ex) {
        dbt.innerText = ex.message;

        toSystemLog('pin_drop', msg);
    }


}
*/

function checkTime(i) {
    return (i < 10) ? "0" + i : i;
}



async function sendmessage(name, question) {

    if (validateConfig()) {
        let dtg0 = new Date();

        const dbt = document.getElementById("debugTxt");
        dbt.innerText = "";

        let today = new Date(),
            h = checkTime(today.getUTCHours()),
            m = checkTime(today.getUTCMinutes()),
            s = checkTime(today.getUTCSeconds());

        let now = h + ":" + m + "z";

        //  get mission_number
        //  get sortie_type
        //  get sortie number
        let msgtype_id = document.getElementById("msgtype_id");
        let msgtype = 0;
        if (msgtype_id != null) {
            msgtype = msgtype_id.value;
        }
        let sortie_num = `${g_sortie_type}${lpad(g_sortie, 4)}`;

        console.log(`g_capid = [${g_capid}]`);
        //console.log(`g_callsign = [${g_callsign}]`);
        console.log(`mission_rid = [${g_mission_rid}]`);
        console.log(`mission_num = [${g_mission_num}]`);
        console.log(`sortie_type = [${g_sortie_type}]`);
        console.log(`sortie = [${g_sortie}]`);
        console.log(`sortie_num = [${sortie_num}]`);
        console.log(`msgtype = [${msgtype}]`);



        //  TODO: what if no location information is available?, prompt user for coordinates


        //alert('send a ' + name + ' message to cactus.  if offline, queue the message in local storage.'  );
        let remarks = document.getElementById("remarks");
        let loc = document.getElementById("coords");

        let remarkstxt = remarks.value;

        let bContinue = true;

        if (question != null) {
            let answer = prompt(question);

            if (answer != null) {
                //msg += ' ' + answer;
                remarkstxt += ' ' + answer;
            }
        }
        else {
            bContinue = confirm('Are you sure?');

        }

        if (bContinue == true) {

            //remarkstxt = sanitize(remarkstxt);

            let msg = 'TO CACTUS and CAPF104a: tablet123: ' + now + ',' + name + ',"' + remarkstxt + '",' + loc.innerText


            dbt.innerText = msg;

            let lat = 0.0;
            let lng = 0.0;

            if (g_position != null && g_position.coords != null) {
                lat = g_position.coords.latitude;
                lng = g_position.coords.longitude;
            }

            let rm = new RadioMessage(name + ' ' + remarkstxt, lat, lng); // TODO: FIX callsign
            rm.Message_Type_ = msgtype;
            rm.Mission_rid = g_mission_rid;
            rm.Mission_Num = g_mission_num;
            rm.Sortie_Num = g_sortie;
            rm.Sortie_Type = g_sortie_type;

            console.log(rm);
            await toCACTUS(JSON.stringify(rm), rm.VID);

            if (remarks != null && remarks.value.trim().length > 0) {
                remarks.value = "";
            }

            if (msgtype_id != null) {
                msgtype_id.value = 0;       // reset to initial
            }

            let dtg1 = new Date();
            console.log(`sendmessage() elaped time = ${dtg1 - dtg0} ms`);
        }
        await GetServerTime();
    }
}


if ('serviceWorker' in navigator) {
    // register service worker
    console.log('before register serviceWorker.');

    navigator.serviceWorker.register('/serviceworker.js').then(registration => {
        console.log('service worker registered');
        console.log(registration);
    }).catch(error => {
        console.log("SW registration failed!");
        console.log(error);
    });

    console.log('after register serviceWorker.');

}


function SendToAzureQ(msg, callsign) {

    //let theUrl = 'https://capsim-test.servicebus.windows.net/messages/messages?body="helloworld"';

    //WC let theUrl = `/Message?capid=${g_capid}&messages="${msg}&callsign=${callsign}"`;
    let theUrl = `https://capsimtest202.azurewebsites.net/Message?capid=${g_capid}&messages="${msg}&callsign=${callsign}"`;
    console.log(theUrl);
    fetchGetText(theUrl);

    /*            let theUrl = `/Message?capid=${g_capid}&callsign=${callsign}"`;
                console.log(theUrl);

                let response = fetchPostJson(theUrl, msg);
                console.log(response);
    */
}




function clearAllCaches() {

    if (confirm("Press OK to DELETE ALL sortie Data?")) {
        if (confirm("Are you really sure?  Press OK to DELETE ALL sortie Data?")) {
            localStorage.clear();
            loadAllCaches();
        }
    }
}

function loadAllCaches() {

    //  read all the caches from persistent storage and load into variables.

    //        var g_messages = null;  	    // table of messages from CACTUS CAPF110 for display on Messages Tab.
    //        var g_lops = null;	    	    // array of LOPs for local plotting
    //        var g_outboundmessages = null;	// array of messages pending transfer to CACTUS
    //        var g_outboundLOPs = null;	    // array of LOPs pending transfer to CACTUS
    //        var g_capf104a = null;		    // CAPF104a object
    //        var g_ics214 = null;		    // ics214 object

    g_messages = localStorage.getItem('g_messages');
    g_lops = localStorage.getItem('g_lops');
    g_outboundmessages = localStorage.getItem('g_outboundmessages');
    g_outboundLOPs = localStorage.getItem('g_outboundLOPs');
    g_capf104a = localStorage.getItem('g_capf104a');
    g_ics214 = localStorage.getItem('g_ics214');

    g_capid = localStorage.getItem('g_capid');
    g_sortie = localStorage.getItem('g_sortie');
    //g_callsign = localStorage.getItem('g_callsign');
    g_mission_rid = localStorage.getItem('g_mission_rid');
    g_sortie_type = localStorage.getItem('g_sortie_type');
    g_mission_num = localStorage.getItem('g_mission_num');

    document.getElementById("capid").value = g_capid;
    document.getElementById("sortie_type").value = g_sortie_type;
    document.getElementById("sortie_num").value = g_sortie;
    //document.getElementById("callsign").value = g_callsign;
    document.getElementById("mission_num").value = g_mission_num;
    document.getElementById("mission_rid").value = g_mission_rid;

}

function saveMessagesCache() {
    if (g_messages == null)
        localStorage.removeItem('g_messages');
    else
        localStorage.setItem('g_messages', g_messages);
}
function saveLopCache() {
    if (g_lops == null)
        localStorage.removeItem('g_lops');
    else
        localStorage.setItem('g_lops', g_lops);
}
function saveOutboundMessagesCache() {
    if (g_outboundmessages == null)
        localStorage.removeItem('g_outboundmessages');
    else
        localStorage.setItem('g_outboundmessages', g_outboundmessages);
}
function saveOutboundLOPsCache() {
    if (g_outboundLOPs == null)
        localStorage.removeItem('g_outboundLOPs');
    else
        localStorage.setItem('g_outboundLOPs', g_outboundLOPs);
}
function saveCapf104aCache() {
    if (g_capf104a == null)
        localStorage.removeItem('g_capf104a');
    else
        localStorage.setItem('g_capf104a', g_capf104a);
}
function saveIcs214Cache() {
    if (g_ics214 == null)
        localStorage.removeItem('g_ics214');
    else
        localStorage.setItem('g_ics214', g_ics214);
}

function testLoadCache() {

    g_messages = 'fake g_message';
    g_lops = 'fake g_lops';
    g_outboundmessages = 'fake g_outboundmessages';
    g_outboundLOPs = 'fake g_outboundLOPs';
    g_capf104a = 'fake g_capf104a';
    g_ics214 = 'fake g_ics214';

    saveMessagesCache();
    saveLopCache();
    saveOutboundMessagesCache();
    saveOutboundLOPsCache();
    saveCapf104aCache();
    saveIcs214Cache();

    loadAllCaches();

    console.log('output localstorage:');
    console.log(localStorage.getItem('g_messages'));
    console.log(localStorage.getItem('g_lops'));
    console.log(localStorage.getItem('g_outboundmessages'));
    console.log(localStorage.getItem('g_outboundLOPs'));
    console.log(localStorage.getItem('g_capf104a'));
    console.log(localStorage.getItem('g_ics214'));
    console.log('end output localstorage:');

}

async function GetServerTime() {

    console.log(`GetServerTime() ${getHrMinSec()} ...`);

    //      Red = OFFLINE
    //      Green = ONLINE to CACTUS
    //      Yellow = ONLINE to CAPSIM, but not CACTUS.

    //WC let url = `api/Time`;
    let url = `https://cors-anywhere.herokuapp.com/capsimtest202.azurewebsites.net/api/Time`; 

    let results1 = await fetchGetJson(url);
    console.log(results1);

    let msg = "NOT CONNECTED";
    g_cxnst = 0;    // NOT CONNECTED
    let cxnst = document.getElementById('cxnState');

    if (cxnst != null) {
        cxnst.innerHTML = msg;
        cxnst.style.background = 'red';

        if (results1 != null) {
            let source = results1.source;
            let strTime = results1.time;

            console.log(`source = ${source}`);
            console.log(`time = ${strTime}`);

            if (source != null) {
                msg = `Connected to ${source} at ${strTime}z`;

                cxnst.innerHTML = msg;
                if (source == 'CACTUS') {
                    cxnst.style.background = 'green';
                    g_cxnst = 2;    // CONNECTED TO CACTUS
                }
                else {
                    cxnst.style.background = 'yellow';
                    g_cxnst = 1;    // CONNECTED TO CAPSIM, BUT CAPSIM CANNOT CONNECT TO CACTUS
                }
            }
        }
    }
    console.log(`g_cxnst = ${g_cxnst}`);
    return "";
}

async function processQueue() {

    await GetServerTime();

    console.log(`processQueue() ${getHrMinSec()} ...`);

    //  read the all the messages from the messages queue in local storage, store in JSON array
    //  send the messages to the Server
    //  if successful, clear the messages queue, log number of messages sent.

    if (g_cxnst > 0) {
        if (g_outboundmessages != null) {
            console.log(g_outboundmessages);

            g_outboundmessages = null;
            saveOutboundMessagesCache();
        }

        if (g_outboundLOPs != null) {
            console.log(g_outboundLOPs);
            g_outboundLOPs = null
            saveOutboundLOPsCache();
        }
    }
    //console.log(`processQueue() ${getHrMinSec()} done.`);
}





// On page load:
//openCity(null, 'tab0');  // Main
openCity(null, 'tab8');  // Config


async function pageload() {

    console.log("Page Load");

    //go to setup page
    $('[href="#setup"]').tab('show');

    

    startTime();
    
    await GetServerTime();   
    

    startGeoLocationWatcher();

    await processQueue();                         // process the message queue immediately

    setInterval(processQueue, 60000);       // process the message queue every 1 min
}


loadAllCaches();
OnChangeSortie_type();
setTimeout(pageload, 1000);

function debug() {
    //go to debug page
    $('[href="#debug"]').tab('show');

    $('#debug-menu').collapse('show')

}

function updateRefreshTime() {

    let str = '';

    let timerdiv = document.getElementById('refreshid');

    if (timerdiv != null) {


        let today = new Date();
        let hr = today.getUTCHours();
        let mm = today.getMinutes();
        let sec = today.getUTCSeconds();

        str = 'Refreshed at ' + lpad(hr) + ':' + lpad(mm) + ':' + lpad(sec) + 'z';

        console.log(str);
        timerdiv.innerText = str;

        return str;

    }
}

function displayMessages(results) {

    console.log('begin: displayMessages()');

    if (results != null && results.length > 0) {


        //  get HTML table for Messages
        let dt = document.getElementById('msgTbl');

        if (dt != null) {

            //  how many rows in table?
            console.log(`dt.rows.length = ${dt.rows.length}`);
            console.log(`results.length = ${results.length}`);


            if ((dt.rows.length - 1) != results.length) {

                //  if rowcounts are different, then clear table.  write rows to table.
                // remove all rows (except TH) from table.
                //while (dt.rows.length > 1) {
                //    //  https://www.w3schools.com/jsref/met_table_deleterow.asp
                //    dt.deleteRow(-1);
                //}
                truncateMessageList();

                // Maybe a clever person would only insert the new rows.

                for (let i = 0; i < results.length; i++) {

                    let row = dt.insertRow(-1);
                    row.bgColor = "white";

                    if (results[i].isOutbound) {
                        row.bgColor = "orange";
                        //  TODO: in the first 5 minutes, play a sound
                    }
                    else
                    {
                        row.bgColor = results[i].BG_color;
                        
                    }

                    let col1 = row.insertCell(0);
                    col1.align = "CENTER";
                    let col2 = row.insertCell(1);
                    col2.align = "LEFT";
                    let col3 = row.insertCell(2);
                    col3.align = "CENTER";


                    //col1.innerText = results[i].Dtg;
                    col1.innerText = results[i].Time;
                    col2.innerText = results[i].Remarks;
                    col3.innerText = results[i].Message_TypeTxt;

                    //  TODO: display Precedence , Message Type
                }
            }
        }
    }

    console.log('End: displayMessages()');
}

function displayMissionList(results) {

    console.log('begin: displayMissionList()');

    if (results != null && results.length > 0) {
        g_mission_list = results;   // TODO: should I write this to localstorage?
    }
    else {
        results = g_mission_list;
    }

    if (results != null && results.length > 0) {


        //  get div0
        let divMissionList = document.getElementById('missionlist');

        if (divMissionList != null) {

            let ml =
                ` <select id = "mission" onchange="OnChangeMission_rid(this);">
                                                                                                                                                                            <option value="0"> Choose a mission: </option>
                                                                                                                                                                        `;

            for (let i = 0; i < results.length; i++) {

                let description = results[i].Description;
                if (description.length > 50) {
                    description = description.substring(0, 50);
                }
                //let descript = `${results[i].Number} - ${description}`;
                let descript = `${results[i].Mission_Num} - ${description}`;

                if (g_mission_rid == results[i].Mission_rid) {
                    ml += `<option value="${results[i].Mission_rid}" selected>${descript}</option>`;
                }
                else {
                    ml += `<option value="${results[i].Mission_rid}">${descript}</option>`;
                }
            }


            ml += `</select>`;

            console.log(ml);

            divMissionList.innerHTML = ml;
        }

    }

    console.log('End: displayMissionList()');
}

async function refreshMessages() {

    if (validateConfig()) {
        let dtg0 = new Date();

        //  get mission_number
        //  get sortie_type
        //  get sortie number
        let msgtype_id = document.getElementById("msgtype_id");
        let msgtype = 0;
        if (msgtype_id != null) {
            msgtype = msgtype_id.value;
        }
        console.log(`mission_rid = [${g_mission_rid}]`);
        console.log(`mission_num = [${g_mission_num}]`);
        console.log(`sortie_type = [${g_sortie_type}]`);
        console.log(`sortie = [${g_sortie}]`);
        console.log(`msgtype = [${msgtype}]`);

        let sortie_num = `${g_sortie_type}${lpad(g_sortie, 4)}`;
        console.log(`sortie_num = [${sortie_num}]`);


        if (sortie_num.length > 1 && (g_mission_rid > 0 || g_mission_num.length > 1)) {

            //WC let urlMessages = `/messages?sortie_num=${sortie_num}&mission_rid=${g_mission_rid}&mission_num=${g_mission_num}`;
            let urlMessages = `https://cors-anywhere.herokuapp.com/capsimtest202.azurewebsites.net/messages?sortie_num=${sortie_num}&mission_rid=${g_mission_rid}&mission_num=${g_mission_num}`;
            
            let results1 = await fetchGetJson(urlMessages);
            console.log(results1);

            displayMessages(results1);
        }


        updateRefreshTime();

        let dtg1 = new Date();
        console.log(`refreshMessages() elaped time = ${dtg1 - dtg0} ms`);

        await GetServerTime();

    }
}

async function refreshMissionsList() {

    let dtg0 = new Date();
    let wing = 'AZ';        //  todo: read from config

    //WC let urlMessages = `/missions?wing=${wing}`;
    let urlMessages = `https://cors-anywhere.herokuapp.com/capsimtest202.azurewebsites.net/missions?wing=${wing}`;

    let results = await fetchGetJson(urlMessages);
    console.log(results);
    //            g_mission_list = results;
    displayMissionList(results);

    let dtg1 = new Date();
    console.log(`refreshMissionsList() elaped time = ${dtg1 - dtg0} ms`);
}

/*
moved to RadioMessage.js
class RadioMessage {

    VID = '';
    ID = self.crypto.randomUUID();;
    Dtg = new Date();
    Precedence = 'R';
    Remarks = '';
    Message_Type = 1;
    Latitude = 0.0;
    Longitude = 0.0;

    constructor(vid, remarks, message_type, latitude, longitude) {

        this.VID = vid;
        //this.ID = self.crypto.randomUUID();
        //this.Dtg = new Date();
        //this.Precedence = 'R';
        this.Message_Type = message_type;
        this.Remarks = remarks;
        this.Latitude = latitude;
        this.Longitude = longitude;
    }
}
*/

async function SendRadioMessages(msg) {

    if (msg != null) {
        //let callsign = g_callsign;
        let msgJson = JSON.stringify(msg);
        //let url = `/messages?callsign=${callsign}&messages=${msgJson}`;
        //WC let url = `/messages?messages=${msgJson}`;
        let url = `https://capsimtest202.azurewebsites.net/messages?messages=${msgJson}`;
        console.log(url);
        await fetchPostText(url, msg);

        await GetServerTime();
    }
}


async function onLoadFunction() {
    //alert('onLoad');

    await refreshMissionsList();

    //await refreshMessages();
    //TODO: push any queued messages.
}
