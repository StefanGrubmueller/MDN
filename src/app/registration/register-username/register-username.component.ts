import { Component } from "@angular/core";
import { RegisterService } from "../../shared/services/register.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register-username",
  templateUrl: "./register-username.component.html",
  styleUrls: ["./register-username.component.scss"],
})
export class RegisterUsernameComponent {
  username: string;

  constructor(
    private registerService: RegisterService,
    private router: Router,
  ) {}

  saveUserNameAndRouteToStep2() {
    this.registerService.setUsername(this.username);
    this.router.navigate(["register/step-2"]);
  }
}
