"use strict";
exports.__esModule = true;
exports.RaceTrackAvailability = void 0;
var enums_1 = require("./enums");
var RaceTrackAvailability = /** @class */ (function () {
    function RaceTrackAvailability() {
        var _a, _b, _c;
        this.trackAvailability = (_a = {},
            _a[enums_1.Tracks.regular] = (_b = {},
                _b[enums_1.Vehicles.bike] = {
                    totalSlots: 4,
                    availableSlots: 4,
                    costPerHour: 60
                },
                _b[enums_1.Vehicles.car] = {
                    totalSlots: 2,
                    availableSlots: 2,
                    costPerHour: 120
                },
                _b[enums_1.Vehicles.suv] = {
                    totalSlots: 2,
                    availableSlots: 2,
                    costPerHour: 200
                },
                _b),
            _a[enums_1.Tracks.vip] = (_c = {},
                _c[enums_1.Vehicles.car] = {
                    totalSlots: 1,
                    availableSlots: 1,
                    costPerHour: 250
                },
                _c[enums_1.Vehicles.suv] = {
                    totalSlots: 1,
                    availableSlots: 1,
                    costPerHour: 300
                },
                _c),
            _a);
    }
    RaceTrackAvailability.prototype.getAvailableTrack = function (vehicleType) {
        for (var item in this.trackAvailability) {
            var trackType = item;
            var trackData = this.trackAvailability[trackType][vehicleType];
            if (trackData && (trackData === null || trackData === void 0 ? void 0 : trackData.availableSlots) > 0) {
                return {
                    trackData: trackData,
                    trackType: trackType
                };
            }
        }
        return undefined;
    };
    RaceTrackAvailability.prototype.releaseTrack = function (trackType, vehicleType) {
        var trackData = this.trackAvailability[trackType][vehicleType];
        if (trackData && trackData.availableSlots < trackData.totalSlots) {
            trackData.availableSlots += 1;
            return trackData;
        }
        return undefined;
    };
    RaceTrackAvailability.prototype.availTrack = function (vehicleType) {
        var availableTrack;
        availableTrack = this.getAvailableTrack(vehicleType);
        if (!availableTrack)
            return undefined;
        availableTrack.trackData.availableSlots -= 1;
        return availableTrack;
    };
    return RaceTrackAvailability;
}());
exports.RaceTrackAvailability = RaceTrackAvailability;
;
