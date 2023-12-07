import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

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
    this.router.navigate(['login']);
  }
}
