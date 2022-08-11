const fs = require('fs');
const filename = process.argv[2] || '';
const RaceTrackManagement = require('./race-track-manager/main.js');

filename &&
fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw err
    const raceTrackManager = new RaceTrackManagement.RaceTrackManager();
    const lines = data.split('\n');
    let vehicleType, vehicleNumber, entryTime, exitTime, status, revenue;
    for (const line of lines) {
        const inputs = line.split(' ');
        switch (inputs[0]) {
            case 'BOOK':
                vehicleType = inputs[1];
                vehicleNumber = inputs[2];
                entryTime = inputs[3];
                status = raceTrackManager.bookTrack(vehicleType, vehicleNumber, entryTime);
                console.log(status);
                break;
            case 'ADDITIONAL':
                vehicleNumber = inputs[1];
                exitTime = inputs[2];
                status = raceTrackManager.bookAdditionalTime(vehicleNumber, exitTime);
                console.log(status);
                break;
            case 'REVENUE':
                revenue = raceTrackManager.getRevenue();
                console.log(revenue);
                return;
            default:
                return;
        }
    }
});
