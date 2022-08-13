import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {numbers} from "@material/dialog";

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  addMovieForm: FormGroup;

  disableDetails = true;

  constructor(private formBuilder: FormBuilder) {
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
    console.log(this.addMovieForm.controls['name'].value);
    console.log(this.addMovieForm.controls['genre'].value);
    console.log(this.addMovieForm.controls['author'].value);
    console.log(this.addMovieForm.controls['watchDate'].value);
    console.log(this.addMovieForm.controls['releaseDate'].value);
    console.log(this.addMovieForm.controls['rating'].value);
  }

  enableDetails(): void {
    this.disableDetails = !this.disableDetails;
  }
}
