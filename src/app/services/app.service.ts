import {HostListener, Injectable} from '@angular/core';
import {ScreenSize} from "../shared/types/screenSize";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  windowInnerWidth: number = window.innerWidth;
  screenSize: ScreenSize = this.getScreenSize();


  getScreenSize(): ScreenSize {
    if (this.windowInnerWidth <= ScreenSize.SMALL) {
      return ScreenSize.SMALL;
    } else if (this.windowInnerWidth <= ScreenSize.MEDIUM) {
      return ScreenSize.MEDIUM;
    } else {
      return ScreenSize.LARGE;
    }
  }
}
