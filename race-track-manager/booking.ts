
import { addHoursToDate, getDateDifferenceInMinutes, getFullDate } from './utilities';
import { AvailableTrack, BookingEntry, BookingRecords } from './types';
import { RaceTrackAvailability } from './availability';
import { RaceTrackRevenue } from './revenue';
import { Vehicles, Outputs } from './enums';
import { TimeConstraints } from './constants';

export class RaceTrackBooking {      

    private availability = new RaceTrackAvailability();
    private revenue = new RaceTrackRevenue();
    private bookings: BookingRecords = {};

    private getAvailableTrack(vehicleType: Vehicles, vehicleEntryTime: Date): AvailableTrack | undefined {
        for (const vehicleNumber in this.bookings) {
            let booking: BookingEntry | undefined = this.bookings[vehicleNumber];
            if (booking.vehicleType === vehicleType && booking.exitTime.getTime() === vehicleEntryTime.getTime()) {
                this.availability.releaseTrack(booking.trackType, booking.vehicleType);
                break;
            }
        }
        return this.availability.availTrack(vehicleType);
    }

    public addBooking(
        vehicleType: Vehicles, 
        vehicleNumber: string, 
        vehicleEntryTime: string
    ): string {
        const entryTime = getFullDate(vehicleEntryTime);
        const entryHour = entryTime.getHours();
        if (entryHour < TimeConstraints.entryHourLowerLimit || entryHour > TimeConstraints.entryHourUpperLimit)
            return Outputs.invalidEntryTime;
        const availableTrack = this.getAvailableTrack(vehicleType, entryTime);
        if (!availableTrack)
            return Outputs.raceTrackFull;
        const exitTime = addHoursToDate(entryTime, TimeConstraints.minimumBookingHours);
        const trackType = availableTrack.trackType;
        const costPerHour = availableTrack.trackData.costPerHour;
        this.bookings[vehicleNumber] = {
            exitTime,
            trackType,
            vehicleType,
        };
        this.revenue.addBookingRevenue(trackType, costPerHour);
        return Outputs.success;
    }

    public extendBooking(
        vehicleNumber: string, 
        newVehicleExitTime: string
    ): string | void {
        const newExitTime = getFullDate(newVehicleExitTime);
        const newExitHour = newExitTime.getHours();
        const bookingEntry = this.bookings[vehicleNumber];
        if (!bookingEntry)
            return;
        if (newExitHour < bookingEntry.exitTime.getHours() || newExitHour >= TimeConstraints.exitHourUpperLimit) 
            return Outputs.invalidExitTime;
        if (!this.getAvailableTrack(bookingEntry.vehicleType, bookingEntry.exitTime))
            return Outputs.raceTrackFull;
        const excessMinutes = getDateDifferenceInMinutes(bookingEntry.exitTime, newExitTime) - TimeConstraints.excessFreeMinutes;
        bookingEntry.exitTime = newExitTime;
        this.revenue.addAdditionalBookingRevenue(bookingEntry.trackType, excessMinutes);
        return Outputs.success;
    }

    public getBookingRevenue = (): string => 
        `${this.revenue.regularRevenue()} ${this.revenue.vipRevenue()}`
};
