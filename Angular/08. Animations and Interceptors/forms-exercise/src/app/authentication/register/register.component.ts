import { Component, OnInit } from '@angular/core';
import { RegisterModel } from "../../models/register.model";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: RegisterModel;
  registerFailed: boolean;
  errorMsg: string;
  constructor(private authService : AuthService, private router : Router) {
    this.model = new RegisterModel('', '', '', '', '', 0)
  }

  ngOnInit() {

  }

  register() {
    delete this.model['confirmPassword'];
    this.authService.register(this.model)
      .subscribe((data) => {
        this.router.navigateByUrl('/home');
      }, (err) => {
        this.registerFailed = true;
        this.errorMsg = err.error.description;
      })
  }

}
