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
export class RoleUserGuard implements CanActivate {
  
  constructor(private router: Router , private _auth: AuthService,) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
 
    if (this._auth.getParseUserData()['role']==='user') {
      return true;
    } else if(this._auth.getParseUserData()['role']==='admin') {
      this.router.navigateByUrl('/products/table-products');
      return true;
    } else{
      return false;
    } 
   
  }
}
