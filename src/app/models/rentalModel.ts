import { Rental } from "./rental";

export class RentalModel implements Rental{
    boPaid: boolean;
    userId: number;
    inTotalDays: number;
    flTotalPrice: number;
    id: number;
    carId: number;
    customerId: number;
    rentDate: Date;
    returnDate: Date;

}