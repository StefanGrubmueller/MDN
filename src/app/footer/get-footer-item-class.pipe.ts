import { Pipe, PipeTransform } from '@angular/core';
import {SelectedItem} from "./footer.component";

@Pipe({
  name: 'getFooterItemClass'
})
export class GetFooterItemClassPipe implements PipeTransform {

  transform(selectedItem: SelectedItem, currentItem: string): string {
    if (selectedItem === currentItem) {
      return currentItem
    } else {
      return 'NOTEXISTINGCLASS'
    }
  }

}
