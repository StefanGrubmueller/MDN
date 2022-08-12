import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  addMovieForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.addMovieForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        genre: [''],
      },
    )
  }

  routeToHome(): void {
    this.router.navigate([''])
  }

  addMovie(): void {

  }
}
