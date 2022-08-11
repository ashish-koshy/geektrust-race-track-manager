import { Tracks, Vehicles } from './enums';

export type TrackParameters = {
    costPerHour: number,
    availableSlots: number,
    totalSlots: number,
}

export type AvailableTrack = {
    trackType: Tracks,
    trackData: TrackParameters
}

export type BookingEntry = {
    exitTime: Date,
    trackType: Tracks,
    vehicleType: Vehicles
}

export type TrackAvailability = {
    [trackType: string]: { 
        [vehicleType: string]: TrackParameters
    }
};

export type BookingRecords = {
    [vehicleNumber: string]: BookingEntry
}

