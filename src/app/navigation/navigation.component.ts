import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  @Input() isVisible = false;

  constructor(private router: Router) {}

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
}
