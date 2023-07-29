import { Component } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, map } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'products';
  hideHeader = true;
  constructor(private readonly router: Router){
    this.initRouterEvents();
  }
  private readonly isNavigationEnd = (event: Event): event is NavigationEnd =>
  event instanceof NavigationEnd;
private initRouterEvents(): void {
  this.router.events
    .pipe(
      filter(this.isNavigationEnd),
      map((event) => event.url || ''),
      untilDestroyed(this)
    )
    .subscribe((currentPage: string | any) => {
      if (currentPage.includes('auth')) {
        this.hideHeader = true;
      } else {
        this.hideHeader = false;
      }
    });
}
}
