import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

export type SelectedItem = 'HOME' | 'SEARCH' | 'ADD' | 'LIB';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  selectedItem: SelectedItem = 'HOME';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeToSearch(): void {
    this.selectedItem = 'SEARCH';
    this.router.navigate(['search']);
  }

  routeToAddMovie(): void {
    this.selectedItem = 'ADD';
    this.router.navigate(['addMovie']);
  }


  routeToLibrary(): void {
    this.selectedItem = 'LIB';
    this.router.navigate(['library']);
  }

  routeToHome(): void {
    this.selectedItem = 'HOME';
    this.router.navigate( ['']);
  }


}
