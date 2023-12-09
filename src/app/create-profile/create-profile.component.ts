import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss'],
})
export class CreateProfileComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Choose your Username',
        routerLink: 'step-1',
      },
      {
        label: 'Email',
        routerLink: 'step-2',
      },
      {
        label: 'Password',
        routerLink: 'step-3',
      },
      {
        label: 'Password Confirmation',
        routerLink: 'step-4',
      },
      {
        label: 'Confirmation',
        routerLink: 'step-1',
      },
    ];
  }
}
