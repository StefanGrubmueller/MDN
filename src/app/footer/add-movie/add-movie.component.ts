import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {numbers} from "@material/dialog";
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

  constructor(private formBuilder: FormBuilder, private db: AngularFirestore) {
  }

  ngOnInit(): void {
    this.addMovieForm = this.formBuilder.group({
        name: ['',],
        genre: [''],
        author: [''],
        watchDate: [Date],
        releaseDate: [Date],
        rating: [numbers],
      },
    );

  }

  addMovie(): void {
    /*console.log(this.addMovieForm.controls['name'].value);
    console.log(this.addMovieForm.controls['genre'].value);
    console.log(this.addMovieForm.controls['author'].value);
    console.log(this.addMovieForm.controls['watchDate'].value);
    console.log(this.addMovieForm.controls['releaseDate'].value);
    console.log(this.addMovieForm.controls['rating'].value);*/

    // PROD COLLECTION
    const tutRef = this.db.collection('stefan.grubmuellerTEST@icloud.com');

    // TEST COLLECTION
    //const tutRef = this.db.collection('TEST@icloud.com');

    const movieDetails = this.getDetailedMovieInformationIfAvailable();
    console.log('movieDetails', movieDetails);
    tutRef.doc(this.addMovieForm.controls['name'].value).set(movieDetails);
  }

  enableDetails(): void {
    this.disableDetails = !this.disableDetails;
  }

  private getDetailedMovieInformationIfAvailable(): MovieType {
    return {
      name: this.addMovieForm.controls['name'].value,
      genre: this.addMovieForm.controls['genre'].value ?? null,
      author: this.addMovieForm.controls['author'].value ?? null
    }

  }
}
