import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MovieType} from "../movieType";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  @Input()
  email: string = "";

  tutorials: any;

  movies: Array<MovieType> = [];

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.tutorials = this.db.collection('stefan.grubmueller@icloud.com').valueChanges();

    this.tutorials.subscribe((movies: any) => console.log(movies[0]));
    this.tutorials.subscribe((movies: Array<MovieType>) => movies.forEach(movie => {
      this.movies.push(movie)
      console.log('movies', this.movies);}));

  }

}
