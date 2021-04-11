import { Pipe, PipeTransform } from '@angular/core';
import { CustomerDetailDto } from '../models/customerDetailDto';

@Pipe({
  name: 'filterCustomer'
})
export class FilterCustomerPipe implements PipeTransform {

  customerList:CustomerDetailDto[]=[];
  transform(value: CustomerDetailDto[], filterText: string): CustomerDetailDto[] {
   
    filterText = filterText ? filterText.toLocaleLowerCase() : "";
    return filterText?value.filter((c: CustomerDetailDto) => c.companyName.toLocaleLowerCase().indexOf(filterText) !== -1)
    :this.customerList;
 
  }

}
