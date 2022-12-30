import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../shared/services/user.service";
import {User} from "../shared/types/user";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: User;

  constructor(private activeRoute: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.pipe().subscribe((p) => {
      this.user = this.userService.getUser(p.userId);
    })
  }

}
