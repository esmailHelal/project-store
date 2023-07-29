import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})

export class NoAuthGuard implements CanActivate {
  
  constructor(private router: Router,private _auth: AuthService) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     if (this._auth.getUserData()) {
      this.router.navigateByUrl('products');

      return false;
    } else {
      return true;
    } 

  }
}
