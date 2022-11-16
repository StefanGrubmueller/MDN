import {Pipe, PipeTransform} from '@angular/core';
import {MovieType} from "../../movieType";

@Pipe({
  name: 'movieSearchFilter'
})
export class MovieSearchFilterPipe implements PipeTransform {

  transform(items: Array<MovieType>, searchText: string): Array<MovieType> {
    if (!items || !searchText) {
      return [];
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.name.toLocaleLowerCase().includes(searchText);
    });
  }

}
