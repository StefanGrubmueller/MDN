import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-main-page',
  templateUrl: './skeleton-main-page.component.html',
  styleUrls: ['./skeleton-main-page.component.scss'],
})
export class SkeletonMainPageComponent {
  skeletonArray = new Array<number>(20);
}
