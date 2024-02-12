import {Component, HostListener, Input} from '@angular/core';
import {Router} from '@angular/router';
import {getScreenSize, ScreenSize} from "../shared/types/screenSize";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  @Input() isVisible = false;

  screenSize: ScreenSize = ScreenSize.SMALL;

  constructor(private router: Router) {
    this.setScreenSize();
  }

  public navigateToPlaylists() {
    this.router.navigate(['/playlist']);
    this.isVisible = false;
  }

  public navigateToUser() {
    this.router.navigate(['user']);
    this.isVisible = false;
  }

  public navigateToLogin() {
    this.router.navigate(['login']);
    this.isVisible = false;
  }

  public navigateToSearch(){
    this.router.navigate(['search']);
    this.isVisible = false;
  }

  public navigateToAddMovies(){
    this.router.navigate(['ADD']);
    this.isVisible = false;
  }

  @HostListener('window:resize')
  private setScreenSize(): void {
    this.screenSize = getScreenSize();
  }

  protected readonly ScreenSize = ScreenSize;
}
