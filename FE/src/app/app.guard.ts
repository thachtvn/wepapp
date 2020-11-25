import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanDeactivate} from '@angular/router';
import {Injectable} from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';

import { TokenService } from './service/token.service';

@Injectable()
export class AppGuard implements CanActivate {

    AppSubscription: Subscription;
    constructor(
        private service: TokenService ,
        private router: Router
        ) { 
    }
    
    canActivate(): boolean {
        if (!this.service.getToken()) {
          this.router.navigate(['login']);
          return false;
        }
        return true;
    }

    

}
