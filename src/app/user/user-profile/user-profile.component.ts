import { Component, OnInit } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { AuthService } from "../../shared/services/auth.service";
import { MessageService } from "primeng/api";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
  providers: [MessageService],
})
export class UserProfileComponent implements OnInit {
  user: any;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe((user: any) => {
      this.user = user;
    });
  }

  resetPassword() {
    this.authService
      .resetPassword(this.user.email)
      .then(() => this.setResetSuccessMessage())
      .catch((error: any) => this.setResetErrorMessage(error));
  }

  private setResetErrorMessage(error: string) {
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: error,
      life: 10000,
    });
  }

  private setResetSuccessMessage() {
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "An email with a link has been sent to reset your password.",
      life: 10000,
    });
  }
}
