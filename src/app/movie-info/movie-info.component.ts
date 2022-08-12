import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MovieType} from "../movieType";

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit {

  movieName: string;

  constructor(private activeRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.pipe().subscribe((p) => {
      this.movieName = p.movieName;
    })
  }

}
