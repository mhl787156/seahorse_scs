import { Component } from '@angular/core';
// import { ROUTER_DIRECTIVES } from '@angular/router';
// import { HTTP_PROVIDERS } from '@angular/http';

// import { Config, AuthGuardService, NavbarComponent, ToolbarComponent} from './shared/index';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  // providers: [HTTP_PROVIDERS, AuthGuardService],
  templateUrl: 'app.component.html',
  // directives: [ROUTER_DIRECTIVES, NavbarComponent, ToolbarComponent]
})
export class AppComponent {
  constructor() {
    // console.log('Environment config', Config);
  }
}
