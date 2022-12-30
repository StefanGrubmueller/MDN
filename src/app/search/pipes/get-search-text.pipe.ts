import {Pipe, PipeTransform} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Pipe({
  name: 'getSearchText',
  pure: false
})
export class GetSearchTextPipe implements PipeTransform {

  transform(searchForm: FormGroup): string {
    if (searchForm && searchForm.controls['searchText'] && searchForm.controls['searchText'].value) {
      return searchForm.controls['searchText'].value;
    } else {
      return '';
    }
  }

}
