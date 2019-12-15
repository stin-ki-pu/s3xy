import { Component } from '@angular/core';
import { fadeAnimation, slideInAnimation, routerTransition, slideInAnimation2 } from './animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation, slideInAnimation, routerTransition, slideInAnimation2]
})
export class AppComponent {
  title = 'sexy3';

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRouteData.animation : '';
  }
}
