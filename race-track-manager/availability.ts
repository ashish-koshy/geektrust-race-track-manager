
import { AvailableTrack, TrackAvailability, TrackParameters } from './types';
import { Tracks, Vehicles } from './enums';

export class RaceTrackAvailability {      
    private trackAvailability: TrackAvailability = {
        [Tracks.regular]: {
            [Vehicles.bike]: {
                totalSlots: 4,
                availableSlots: 4,
                costPerHour: 60,
            },
            [Vehicles.car]: {
                totalSlots: 2,
                availableSlots: 2,
                costPerHour: 120
            },
            [Vehicles.suv]: {
                totalSlots: 2,
                availableSlots: 2,
                costPerHour: 200,
            }
        },
        [Tracks.vip]: {
            [Vehicles.car]: {
                totalSlots: 1,
                availableSlots: 1,
                costPerHour: 250
            },
            [Vehicles.suv]: {
                totalSlots: 1,
                availableSlots: 1,
                costPerHour: 300
            }
        }
    };

    private getAvailableTrack(vehicleType: Vehicles): AvailableTrack | undefined {
        for (const item in this.trackAvailability) {
            const trackType = item as Tracks;
            let trackData: TrackParameters | undefined = this.trackAvailability[trackType][vehicleType];
            if (trackData && trackData?.availableSlots > 0) {
                return {
                    trackData, 
                    trackType
                }
            }
        }
        return undefined;
    }

    public releaseTrack(trackType: Tracks, vehicleType: Vehicles): TrackParameters | undefined {
        const trackData: TrackParameters | undefined = this.trackAvailability[trackType][vehicleType];
        if (trackData && trackData.availableSlots < trackData.totalSlots) {
            trackData.availableSlots += 1;
            return trackData;
        }
        return undefined;
    }
     
    public availTrack(vehicleType: Vehicles): AvailableTrack | undefined {
        let availableTrack!: AvailableTrack | undefined;
        availableTrack = this.getAvailableTrack(vehicleType);
        if (!availableTrack)
            return undefined;
        availableTrack.trackData.availableSlots -= 1;
        return availableTrack;
    }
};