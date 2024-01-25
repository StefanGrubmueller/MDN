import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonMainPageComponent } from './skeleton-main-page.component';

describe('SkeletonMainPageComponent', () => {
  let component: SkeletonMainPageComponent;
  let fixture: ComponentFixture<SkeletonMainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkeletonMainPageComponent]
    });
    fixture = TestBed.createComponent(SkeletonMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
