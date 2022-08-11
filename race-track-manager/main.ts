
import { Vehicles } from './enums';
import { RaceTrackBooking } from './booking';

export class RaceTrackManager {      

    private booking = new RaceTrackBooking();

    public bookTrack = (
        vehicleType: Vehicles, 
        vehicleNumber: string, 
        entryTime: string
    ): string => this.booking.addBooking(
        vehicleType, 
        vehicleNumber, 
        entryTime
    );

    public bookAdditionalTime = (
        vehicleNumber: string, 
        exitTime: string
    ): string | void => this.booking.extendBooking(
        vehicleNumber, 
        exitTime
    );

    public getRevenue = (): string => this.booking.getBookingRevenue();
};