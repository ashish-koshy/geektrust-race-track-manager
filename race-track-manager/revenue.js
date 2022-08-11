"use strict";
exports.__esModule = true;
exports.RaceTrackRevenue = void 0;
var constants_1 = require("./constants");
var enums_1 = require("./enums");
var RaceTrackRevenue = /** @class */ (function () {
    function RaceTrackRevenue() {
        var _this = this;
        this.vipTrackRevenue = 0;
        this.regularTrackRevenue = 0;
        this.regularRevenue = function () { return _this.regularTrackRevenue || 0; };
        this.vipRevenue = function () { return _this.vipTrackRevenue || 0; };
    }
    RaceTrackRevenue.prototype.addCost = function (trackType, cost) {
        switch (trackType) {
            case enums_1.Tracks.vip:
                this.vipTrackRevenue += cost;
                break;
            case enums_1.Tracks.regular:
                this.regularTrackRevenue += cost;
                break;
            default:
                return;
        }
    };
    RaceTrackRevenue.prototype.addBookingRevenue = function (trackType, costPerHour) {
        if (costPerHour <= 0)
            return;
        var total = costPerHour * constants_1.TimeConstraints.minimumBookingHours;
        this.addCost(trackType, total);
    };
    RaceTrackRevenue.prototype.addAdditionalBookingRevenue = function (trackType, excessMinutes) {
        if (excessMinutes <= 0)
            return;
        var total = 0;
        total += ~~(excessMinutes / 60) * constants_1.TimeConstraints.excessChargePerHour;
        total += excessMinutes % 60 === 0 ? 0 : constants_1.TimeConstraints.excessChargePerHour;
        this.addCost(trackType, total);
    };
    return RaceTrackRevenue;
}());
exports.RaceTrackRevenue = RaceTrackRevenue;
;
