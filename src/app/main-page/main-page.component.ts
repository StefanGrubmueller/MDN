import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MovieType } from '../movieType';
import { Router } from '@angular/router';
import { ManageMoviesOfDbService } from '../shared/services/manage-movies-of-db.service';
import { UserService } from '../shared/services/user.service';
import {getScreenSize, ScreenSize} from '../shared/types/screenSize';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [MessageServiceg],
})
export class MainPageComponent implements OnInit {
  @Input()
  email: string = '';

  screenSize: ScreenSize = ScreenSize.SMALL;
  localMovies: Array<MovieType> = [];
  logged: boolean = false;

  constructor(
    private router: Router,
    private manageMoviesOfDbService: ManageMoviesOfDbService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.setScreenSize();
    this.logged = this.userService.getUserStatus();
    if (!this.logged) {
      this.router.navigate(['login']);
    }
    this.initialLoadAllMovies();
  }

  public routeToNewEntry() {
    this.router.navigate(['ADD']);
  }

  private initialLoadAllMovies() {
    this.localMovies = this.manageMoviesOfDbService.getAllMovies();
  }

  @HostListener('window:resize')
  private setScreenSize(): void {
    this.screenSize = getScreenSize();
  }
}
