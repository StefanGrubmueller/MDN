import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MovieType} from "../../movieType";

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  addMovieForm: FormGroup;

  disableDetails = true;
  errors: any = {};

  constructor(private formBuilder: FormBuilder, private db: AngularFirestore) {
  }

  get name() {
    return this.addMovieForm.get('name');
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
    // PROD COLLECTION
    const collection = this.db.collection('stefan.grubmueller@icloud.com');

    // TEST COLLECTION
    //const collection = this.db.collection('TEST@icloud.com');

    const movieDetails = this.getDetailedMovieInformationIfAvailable();
    collection.doc(this.addMovieForm.controls['name'].value).set(movieDetails);
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
