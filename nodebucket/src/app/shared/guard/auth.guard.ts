/**
 * Title: auth.guard.ts
 * Author: Professor Krasso
 * Date: 23 September 2020
 * Modified By: Diandra McKenzie
 * Description: Auth Guard file
 */

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';




@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieServer: CookieService) {
  }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const sessionUser = this.cookieServer.get('session_user');

    if (sessionUser) {
      return true;
    } else {

      this.router.navigate(['/session/sign-in']);

      return false;
    }

  }

}
