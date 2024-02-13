import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieInfoSmComponent } from './movie-info-sm.component';

describe('MovieInfoSmComponent', () => {
  let component: MovieInfoSmComponent;
  let fixture: ComponentFixture<MovieInfoSmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieInfoSmComponent]
    });
    fixture = TestBed.createComponent(MovieInfoSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
