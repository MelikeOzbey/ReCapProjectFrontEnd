import { Brand } from "./brand";
import { Car } from "./car";
import { Color } from "./color";

export class CarTestModel implements Car{
    id: number;
    carName: string;
    brandId: number;
    colorId: number;
    modelYear: Date;
    dailyPrice: number;
    description: string;
    findexNo: number;
    brands:Brand[];
    colors:Color[];

}