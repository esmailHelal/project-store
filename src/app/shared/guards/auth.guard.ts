import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router , private _auth: AuthService,) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
 
    if (!this._auth.getUserData()) {
      this.router.navigateByUrl('/auth');

      return false;
    } else {
      return true;
    }  
   
  }
}
