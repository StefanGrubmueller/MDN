import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenSize } from '../shared/types/screenSize';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  screenSize: ScreenSize = ScreenSize.SMALL;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setScreenSize();
  }

  routeToHome() {
    this.router.navigate(['']);
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
