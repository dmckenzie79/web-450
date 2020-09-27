/**
 * Title: auth.guard.ts
 * Author: Professor Krasso
 * Date: 23 September 2020
 * Modified By: Diandra McKenzie
 * Description: Auth Guard file
 */

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieServer: CookieService) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const sessionUser = this.cookieServer.get('session_user');

    if (sessionUser) {
      return true;
    } else {

      this.router.navigate(['session/sign-in']);

      return false;
    }

  }

}
