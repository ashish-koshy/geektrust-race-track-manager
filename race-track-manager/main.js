"use strict";
exports.__esModule = true;
exports.RaceTrackManager = void 0;
var booking_1 = require("./booking");
var RaceTrackManager = /** @class */ (function () {
    function RaceTrackManager() {
        var _this = this;
        this.booking = new booking_1.RaceTrackBooking();
        this.bookTrack = function (vehicleType, vehicleNumber, entryTime) { return _this.booking.addBooking(vehicleType, vehicleNumber, entryTime); };
        this.bookAdditionalTime = function (vehicleNumber, exitTime) { return _this.booking.extendBooking(vehicleNumber, exitTime); };
        this.getRevenue = function () { return _this.booking.getBookingRevenue(); };
    }
    return RaceTrackManager;
}());
exports.RaceTrackManager = RaceTrackManager;
;
