import { TimeConstraints } from './constants';
import { Tracks } from './enums';

export class RaceTrackRevenue {
    private vipTrackRevenue: number = 0;
    private regularTrackRevenue: number = 0;

    private addCost(trackType: Tracks, cost: number): void {
        switch (trackType) {
            case Tracks.vip:
                this.vipTrackRevenue += cost;
                break;
            case Tracks.regular:
                this.regularTrackRevenue += cost;
                break;
            default:
                return;
        }
    }

    public addBookingRevenue(trackType: Tracks, costPerHour: number): void {
        if (costPerHour <= 0) return;
        const total = costPerHour * TimeConstraints.minimumBookingHours;
        this.addCost(trackType, total);
    }

    public addAdditionalBookingRevenue(trackType: Tracks, excessMinutes: number): void {
        if (excessMinutes <= 0) return;
        let total = 0;
        total += ~~(excessMinutes / 60) * TimeConstraints.excessChargePerHour;
        total += excessMinutes % 60 === 0 ? 0 : TimeConstraints.excessChargePerHour;
        this.addCost(trackType, total);
    }
    
    public regularRevenue = () => this.regularTrackRevenue || 0
    public vipRevenue = () => this.vipTrackRevenue || 0
};