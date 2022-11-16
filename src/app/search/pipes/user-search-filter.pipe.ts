import {Pipe, PipeTransform} from '@angular/core';
import {User} from "../../shared/types/user";

@Pipe({
  name: 'userSearchFilter',
  pure: false
})
export class UserSearchFilterPipe implements PipeTransform {

  transform(items: Array<User>, searchText: string): Array<User> {
    if (!items || !searchText) {
      return [];
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.userName.toLocaleLowerCase().includes(searchText);
    });
  }

}
