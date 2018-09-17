import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginModel } from "../models/login.model";
import { RegisterModel } from "../models/register.model";

const appKey = "kid_rk2HHHCEQ";
const appSecret = "39651f5ca816476f925d9fccd6f62b2f";
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;

@Injectable()
export class AuthService {
  private currentAuthtoken: string;

  constructor(private http: HttpClient) {

  }

  login(model: LoginModel) {
    return this.http.post(
      loginUrl,
      JSON.stringify(model)
    )
  }

  register(model: RegisterModel) {
    return this.http.post(
      registerUrl,
      JSON.stringify(model)
    )
  }

  logout() {
    return this.http.post(logoutUrl, {});
  }

  checkIfLogged() {
    return this.currentAuthtoken === localStorage.getItem('authtoken');
  }

  get authtoken() {
    return this.currentAuthtoken;
  }

  set authtoken(value: string) {
    this.currentAuthtoken = value;
  }
}
