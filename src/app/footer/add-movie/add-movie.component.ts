import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {numbers} from "@material/dialog";

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  addMovieForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.addMovieForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        genre: [''],
        author: [''],
        watchDate: [Date],
        releaseDate: [Date],
        rating: [numbers],
      },
    )
  }

  routeToHome(): void {
    this.router.navigate([''])
  }

  addMovie(): void {
    console.log(this.addMovieForm.controls['name'].value);
    console.log(this.addMovieForm.controls['genre'].value);
    console.log(this.addMovieForm.controls['author'].value);
    console.log(this.addMovieForm.controls['watchDate'].value);
    console.log(this.addMovieForm.controls['releaseDate'].value);
    console.log(this.addMovieForm.controls['rating'].value);
  }
}
