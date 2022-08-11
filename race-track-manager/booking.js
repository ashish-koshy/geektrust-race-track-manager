"use strict";
exports.__esModule = true;
exports.RaceTrackBooking = void 0;
var utilities_1 = require("./utilities");
var availability_1 = require("./availability");
var revenue_1 = require("./revenue");
var enums_1 = require("./enums");
var constants_1 = require("./constants");
var RaceTrackBooking = /** @class */ (function () {
    function RaceTrackBooking() {
        var _this = this;
        this.availability = new availability_1.RaceTrackAvailability();
        this.revenue = new revenue_1.RaceTrackRevenue();
        this.bookings = {};
        this.getBookingRevenue = function () {
            return "".concat(_this.revenue.regularRevenue(), " ").concat(_this.revenue.vipRevenue());
        };
    }
    RaceTrackBooking.prototype.getAvailableTrack = function (vehicleType, vehicleEntryTime) {
        for (var vehicleNumber in this.bookings) {
            var booking = this.bookings[vehicleNumber];
            if (booking.vehicleType === vehicleType && booking.exitTime.getTime() === vehicleEntryTime.getTime()) {
                this.availability.releaseTrack(booking.trackType, booking.vehicleType);
                break;
            }
        }
        return this.availability.availTrack(vehicleType);
    };
    RaceTrackBooking.prototype.addBooking = function (vehicleType, vehicleNumber, vehicleEntryTime) {
        var entryTime = (0, utilities_1.getFullDate)(vehicleEntryTime);
        var entryHour = entryTime.getHours();
        if (entryHour < constants_1.TimeConstraints.entryHourLowerLimit || entryHour > constants_1.TimeConstraints.entryHourUpperLimit)
            return enums_1.Outputs.invalidEntryTime;
        var availableTrack = this.getAvailableTrack(vehicleType, entryTime);
        if (!availableTrack)
            return enums_1.Outputs.raceTrackFull;
        var exitTime = (0, utilities_1.addHoursToDate)(entryTime, constants_1.TimeConstraints.minimumBookingHours);
        var trackType = availableTrack.trackType;
        var costPerHour = availableTrack.trackData.costPerHour;
        this.bookings[vehicleNumber] = {
            exitTime: exitTime,
            trackType: trackType,
            vehicleType: vehicleType
        };
        this.revenue.addBookingRevenue(trackType, costPerHour);
        return enums_1.Outputs.success;
    };
    RaceTrackBooking.prototype.extendBooking = function (vehicleNumber, newVehicleExitTime) {
        var newExitTime = (0, utilities_1.getFullDate)(newVehicleExitTime);
        var newExitHour = newExitTime.getHours();
        var bookingEntry = this.bookings[vehicleNumber];
        if (!bookingEntry)
            return;
        if (newExitHour < bookingEntry.exitTime.getHours() || newExitHour >= constants_1.TimeConstraints.exitHourUpperLimit)
            return enums_1.Outputs.invalidExitTime;
        if (!this.getAvailableTrack(bookingEntry.vehicleType, bookingEntry.exitTime))
            return enums_1.Outputs.raceTrackFull;
        var excessMinutes = (0, utilities_1.getDateDifferenceInMinutes)(bookingEntry.exitTime, newExitTime) - constants_1.TimeConstraints.excessFreeMinutes;
        bookingEntry.exitTime = newExitTime;
        this.revenue.addAdditionalBookingRevenue(bookingEntry.trackType, excessMinutes);
        return enums_1.Outputs.success;
    };
    return RaceTrackBooking;
}());
exports.RaceTrackBooking = RaceTrackBooking;
;
