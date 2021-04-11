import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailDto } from '../models/CarDetailDto';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: CarDetailDto[], filterText: string): CarDetailDto[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : "";
    var carSearch = value.filter((c: CarDetailDto) => c.carName.toLocaleLowerCase().indexOf(filterText) !== -1);
    var colorSearch = value.filter((c: CarDetailDto) => c.colorName.toLocaleLowerCase().indexOf(filterText) !== -1)
    if (filterText) {
   
      if (carSearch.length > 0)
        return carSearch;
      else if (colorSearch.length > 0)
        return colorSearch

    } else {
      return value;
    }


  }

}
