export interface Rental{
    id:number; 
    carId :number;
    customerId :number;
    rentDate :Date;
    returnDate :Date;
    inTotalDays:number;
    flTotalPrice:number;
    userId:number;
    boPaid:boolean;
}