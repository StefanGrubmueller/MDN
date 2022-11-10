import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MovieType} from "../../movieType";
import {ManageMoviesOfDbService} from "../../shared/manage-movies-of-db.service";

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  addMovieForm: FormGroup;

  disableDetails = true;
  errors: any = {};

  startDate = new Date(1990, 0, 1);


  constructor(private formBuilder: FormBuilder, private db: AngularFirestore, private manageMovieService: ManageMoviesOfDbService) {
  }

  ngOnInit(): void {
    this.addMovieForm = this.formBuilder.group({
        name: [null, [Validators.required]],
        genre: [],
        author: [],
        watchDate: [],
        releaseDate: [],
        rating: [],
      },
    );

  }

  addMovie(): void {
    const movieDetails = this.getDetailedMovieInformationIfAvailable();
    this.manageMovieService.uploadMovie(movieDetails);
  }

  enableDetails(): void {
    this.disableDetails = !this.disableDetails;
  }

  private getDetailedMovieInformationIfAvailable(): MovieType {
    return {
      name: this.addMovieForm.controls['name'].value,
      genre: this.addMovieForm.controls['genre'].value ?? null,
      author: this.addMovieForm.controls['author'].value ?? null,
      watchDate: this.addMovieForm.controls['watchDate'].value ?? null,
      releaseDate: this.addMovieForm.controls['releaseDate'].value ?? null,
      rating: this.addMovieForm.controls['rating'].value ?? null
    }
  }
}
