import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { ManageMoviesOfDbService } from '../shared/services/manage-movies-of-db.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  items: MenuItem[] | undefined;
  selectedItem: MenuItem | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private manageMovieService: ManageMoviesOfDbService
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'User',
        icon: 'pi pi-fw pi-user',
        command: () => {
          this.routeToUserProfile();
        },
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-lock',
        command: () => {
          this.logout();
        },
      },
    ];
  }

  private routeToUserProfile(): void {
    this.router.navigate(['user']);
  }

  private logout(): void {
    this.authService.logout();
    this.manageMovieService.clearAllMovies();
    localStorage.setItem('user', '');
    this.router.navigate(['login']);
  }
}
