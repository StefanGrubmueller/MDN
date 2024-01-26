import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isUserLoggedIn: boolean = false;
  isNavigationVisible = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const localStorageUserToken: string | null = localStorage.getItem('user');
    const rememberUser: string | null = localStorage.getItem('rememberUser');

    if (!rememberUser) {
      this.authService.logout();
    }

    if (localStorageUserToken == null) {
      this.router.navigate(['login']);
    }

    this.authService
      .getFirebaseAuthState()
      .pipe(untilDestroyed(this))
      .subscribe((state) => (this.isUserLoggedIn = state != null));
  }

  public setNavigationVisibility(visible: boolean) {
    this.isNavigationVisible = visible;
  }

  ngOnDestroy() {}
}
