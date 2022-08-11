"use strict";
exports.__esModule = true;
exports.getDateDifferenceInMinutes = exports.addHoursToDate = exports.getFullDate = void 0;
var getFullDate = function (time) {
    return new Date("".concat(new Date().toLocaleDateString('en-US'), " ").concat(time));
};
exports.getFullDate = getFullDate;
var addHoursToDate = function (inputDate, hours) {
    var outputDate = inputDate;
    outputDate.setHours(inputDate.getHours() + (hours || 0));
    return outputDate;
};
exports.addHoursToDate = addHoursToDate;
var getDateDifferenceInMinutes = function (startDate, endDate) {
    return ((endDate.getTime() - startDate.getTime()) / 60000);
};
exports.getDateDifferenceInMinutes = getDateDifferenceInMinutes;
