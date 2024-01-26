import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { ScreenSize } from '../shared/types/screenSize';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  @Output() onNavigationClicked: EventEmitter<boolean> = new EventEmitter();
  screenSize: ScreenSize = ScreenSize.SMALL;
  private _isNavigationVisible = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setScreenSize();
  }

  public routeToHome() {
    this.router.navigate(['']);
  }

  public toggleNavigation() {
    this._isNavigationVisible = !this._isNavigationVisible;
    this.onNavigationClicked.emit(this._isNavigationVisible);
  }

  @HostListener('window:resize')
  public setScreenSize(): void {
    if (window.innerWidth <= ScreenSize.SMALL) {
      this.screenSize = ScreenSize.SMALL;
    } else if (window.innerWidth <= ScreenSize.MEDIUM) {
      this.screenSize = ScreenSize.MEDIUM;
    } else {
      this.screenSize = ScreenSize.LARGE;
    }
  }

  protected readonly ScreenSize = ScreenSize;
}
