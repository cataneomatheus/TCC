import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';
import { decode } from 'punycode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  jwtHelper = new JwtHelperService();
  decodeToken: any;

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data.expectedRole;

    const token = localStorage.getItem('token');

    this.decodeToken = this.jwtHelper.decodeToken(token);

    if (this.decodeToken.actort == "True" && expectedRole == "Admin") {
      return true;

    } else {
      this.router.navigate(['/aluno']);
      return false;
    }

    // if (localStorage.getItem('token') !== null) {
    //   this.decodeToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));

    //   if (this.decodeToken.actort == "False") {
    //     return true;
    //   }

    // } else {
    //   this.router.navigate(['/user/login']);
    //   return false;
    // }
  }
}
