import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';

import { HttpService } from './http.service';

@Injectable()
export class RedirectService implements CanActivate {
  constructor(private httpService: HttpService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.httpService.getExpense(route.params['id']).pipe(
      catchError(() => {
        this.router.navigate(['']);
        return of({});
      }),
      map((isFound) => {
        if (isFound) {
          return true;
        }

        return false;
      })
    );
  }
}
