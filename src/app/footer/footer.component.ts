import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

export type FooterItem = 'HOME' | 'SEARCH' | 'ADD' | 'LIB';
const HOME_ID: FooterItem = 'HOME';
const SEARCH_ID: FooterItem = 'SEARCH';
const ADD_ID: FooterItem = 'ADD';
const LIB_ID: FooterItem = 'LIB';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  activeItem: MenuItem | undefined;
  items: MenuItem[] | undefined;

  HOME_ITEM: MenuItem = {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    id: HOME_ID,
  };
  SEARCH_ITEM: MenuItem = {
    label: 'Search',
    icon: 'pi pi-fw pi-search',
    id: SEARCH_ID,
  };
  ADD_ITEM: MenuItem = { label: 'Add', icon: 'pi pi-fw pi-plus', id: ADD_ID };
  LIB_ITEM: MenuItem = {
    label: 'Lib',
    icon: 'pi pi-fw pi-bookmark',
    id: LIB_ID,
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items = [
      this.HOME_ITEM,
      this.SEARCH_ITEM,
      this.ADD_ITEM,
      //has to be implemented
      // this.LIB_ITEM
    ];
    this.activeItem = this.HOME_ITEM;
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
    this.router.navigate([event.id]);
  }
}
