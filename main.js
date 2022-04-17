// curl 'https://tools.usps.com/UspsToolsRestServices/rest/v2/facilityScheduleSearch' \
//   -H 'accept: application/json, text/javascript, */*; q=0.01' \
//   -H 'content-type: application/json;charset=UTF-8' \
//   -H 'x-requested-with: XMLHttpRequest' \
//   -H 'sec-ch-ua-mobile: ?0' \
//   -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36' \
//   --data-raw '{"poScheduleType":"PASSPORT","date":"20220219","numberOfAdults":"1","numberOfMinors":"0","radius":"20","zip5":"95051","city":"","state":""}' \
//   --compressed

// curl 'https://tools.usps.com/UspsToolsRestServices/rest/v2/appointmentTimeSearch' \
//   -H 'accept: application/json, text/javascript, */*; q=0.01' \
//   -H 'content-type: application/json;charset=UTF-8' \
//   -H 'x-requested-with: XMLHttpRequest' \
//   -H 'sec-ch-ua-mobile: ?0' \
//   -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36' \
//   --data-raw '{"date":"20220222","productType":"PASSPORT","numberOfAdults":"1","numberOfMinors":"0","excludedConfirmationNumber":[""],"fdbId":["1373393"],"skipEndOfDayRecord":true}' \
//   --compressed

import fetch from "node-fetch";

const rootURL = 'https://tools.usps.com/UspsToolsRestServices/rest/v2';
const headers = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'content-type': 'application/json;charset=UTF-8',
    'x-requested-with': 'XMLHttpRequest',
    'sec-ch-ua-mobile': '?0',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
};

function formatDate(d) {
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();
    return `${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`;
}

function getDates() {
    let res = [];
    let next = new Date();
    next.setDate(next.getDate() + 1);
    for (let i = 0; i < 20; i++) {
        const date = formatDate(next);
        next.setDate(next.getDate() + 1);
        res.push(date);
    }
    return res;
}

async function getLocations(zip) {
    const resp = await fetch(`${rootURL}/facilityScheduleSearch`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "poScheduleType": "PASSPORT",
            "date": formatDate(new Date()),
            "numberOfAdults": "1",
            "numberOfMinors": "0",
            "radius": "20",
            "zip5": zip,
            "city": "",
            "state": ""
        })
    }).then(res => res.json());
    return resp.facilityDetails.map(item => ({fdbId: item.fdbId, name: item.name}));
}

async function getAppointments(date, fdbIds) {
    const appointments = await fetch(`${rootURL}/appointmentTimeSearch`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "date": date,
            "productType":"PASSPORT",
            "numberOfAdults":"1",
            "numberOfMinors":"0",
            "excludedConfirmationNumber":[""],
            "fdbId": fdbIds,
            "skipEndOfDayRecord":true,
        })
    }).then(resp => resp.json());
    return appointments.appointmentTimeDetailExtended.filter(
        appt => appt.appointmentStatus != 'Unavailable' &&
        appt.appointmentStatus != 'Closed' &&
        appt.appointmentStatus != 'Holiday' &&
        appt.appointmentStatus != 'Past');
}

async function main(args) {
    let zip = '';
    if (args.length < 1) {
        console.log('Usage: node main.js <zip>');
        return;
    } else {
        zip = args[0];
    }

    console.info('getting locations ids...');
    const locations = await getLocations(zip);
    console.info(`found ${locations.length} locations`);
    const dates = getDates();
    for (let date of dates) {
        for (let location of locations) {
            console.info(`getting appointments for ${date} ${location.name}`);
            const appointments = await getAppointments(date, [location.fdbId]);
            console.info(`found ${appointments.length} appointments`);
            if (appointments.length > 0) {
                console.info(appointments);
            }
        }
    }
}

main(process.argv.slice(2)).catch(console.error);