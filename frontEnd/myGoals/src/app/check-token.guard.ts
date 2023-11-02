import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class CheckTokenGuard implements CanActivate {
  constructor(private stateService: StateService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.stateService.state.value.token ? true: false;
  }
  
}
