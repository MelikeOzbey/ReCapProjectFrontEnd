import { RentalDetailDto } from "./rentalDetailDto";


export class RentalModel implements RentalDetailDto{
    carName: string;
    companyName: string;
    dailyPrice: number;
    UserName: string;
    StFirstCarImage: string;
    findexNo: number;
    brandName: string;
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