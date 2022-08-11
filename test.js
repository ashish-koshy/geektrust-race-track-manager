const assert = require('assert');
const RaceTrackManagement = require('./race-track-manager/main.js');

describe(`should add bookings, additions and validate the revenue as '590 0'`, function () {
    const raceTrackManager = new RaceTrackManagement.RaceTrackManager();
    it(`should return booking status as 'SUCCESS'`, () => 
        assert.equal(raceTrackManager.bookTrack('BIKE', 'M40', '14:00'), 'SUCCESS')
    );
    it(`should return booking status as 'SUCCESS'`, () =>
        assert.equal(raceTrackManager.bookTrack('CAR', 'O34', '15:00'), 'SUCCESS')
    );
    it(`should return booking status as 'INVALID_ENTRY_TIME'`, () =>
        assert.equal(raceTrackManager.bookTrack('SUV', 'A66', '11:00'), 'INVALID_ENTRY_TIME')
    );
    it(`should return additional status as 'SUCCESS'`, () => 
        assert.equal(raceTrackManager.bookAdditionalTime('M40', '17:40'), 'SUCCESS')
    );
    it(`should return additional status as 'INVALID_EXIT_TIME'`, () => 
        assert.equal(raceTrackManager.bookAdditionalTime('O34', '20:50'), 'INVALID_EXIT_TIME')
    );
    it(`should return revenue as '590 0'`, () => 
        assert.equal(raceTrackManager.getRevenue(), '590 0')
    );
});

describe(`should add bookings, additions and validate the revenue as '1370 0'`, function () {
    const raceTrackManager = new RaceTrackManagement.RaceTrackManager();
    it(`should return booking status as 'INVALID_ENTRY_TIME'`, () => 
        assert.equal(raceTrackManager.bookTrack('suv', 'xy4', '12:30'), 'INVALID_ENTRY_TIME')
    );
    it(`should return booking status as 'SUCCESS'`, () =>
        assert.equal(raceTrackManager.bookTrack('SUV', 'A56', '13:10'), 'SUCCESS')
    );
    it(`should return booking status as 'SUCCESS'`, () =>
        assert.equal(raceTrackManager.bookTrack('CAR', 'AB1', '14:20'), 'SUCCESS')
    );
    it(`should return booking status as 'SUCCESS'`, () =>
        assert.equal(raceTrackManager.bookTrack('BIKE', 'BIK1', '13:00'), 'SUCCESS')
    );
    it(`should return booking status as 'SUCCESS'`, () =>
        assert.equal(raceTrackManager.bookTrack('BIKE', 'BIK2', '14:00'), 'SUCCESS')
    );
    it(`should return additional booking status as 'SUCCESS'`, () =>
        assert.equal(raceTrackManager.bookAdditionalTime('BIK2', '17:50'), 'SUCCESS')
    );
    it(`should return revenue as '1370 0'`, () => 
        assert.equal(raceTrackManager.getRevenue(), '1370 0')
    );
});

describe(`should add bookings, additions and validate the revenue as '1800 900'`, function () {
    const raceTrackManager = new RaceTrackManagement.RaceTrackManager();
    it(`should return booking status as 'SUCCESS'`, () => 
        assert.equal(raceTrackManager.bookTrack('SUV', 'M40', '14:00'), 'SUCCESS')
    );
    it(`should return booking status as 'SUCCESS'`, () => 
        assert.equal(raceTrackManager.bookTrack('SUV', 'O34', '15:00'), 'SUCCESS')
    );
    it(`should return booking status as 'SUCCESS'`, () => 
        assert.equal(raceTrackManager.bookTrack('SUV', 'XY4', '13:00'), 'SUCCESS')
    );
    it(`should return booking status as 'RACETRACK_FULL'`, () => 
        assert.equal(raceTrackManager.bookTrack('SUV', 'A56', '13:10'), 'RACETRACK_FULL')
    );
    it(`should return booking status as 'RACETRACK_FULL'`, () =>
        assert.equal(raceTrackManager.bookTrack('SUV', 'AB1', '14:20'), 'RACETRACK_FULL')
    );
    it(`should return booking status as 'RACETRACK_FULL'`, () =>
        assert.equal(raceTrackManager.bookTrack('SUV', 'S45', '15:30'), 'RACETRACK_FULL')
    );
    it(`should return booking status as 'SUCCESS'`, () =>
        assert.equal(raceTrackManager.bookTrack('SUV', 'XY22', '17:00'), 'SUCCESS')
    );
    it(`should return booking status as 'INVALID_ENTRY_TIME'`, () =>
        assert.equal(raceTrackManager.bookTrack('SUV', 'B56', '18:00'), 'INVALID_ENTRY_TIME')
    );
    it(`should return revenue as '1800 900'`, () => 
        assert.equal(raceTrackManager.getRevenue(), '1800 900')
    );
});
