import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { AngularPlugin } from '@microsoft/applicationinsights-angularplugin-js';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'moviesapp';

  constructor(
    private router: Router
  ){
      var angularPlugin = new AngularPlugin();
  // *** Add the Click Analytics plug-in. ***
  /* var clickPluginInstance = new ClickAnalyticsPlugin();
      var clickPluginConfig = {
        autoCapture: true
      }; */
      const appInsights = new ApplicationInsights({
          config: {
              connectionString: environment.APP_INSIGHTS_CONNECTION_STRING,
              // *** If you're adding the Click Analytics plug-in, delete the next line. ***
              extensions: [angularPlugin],
          // *** Add the Click Analytics plug-in. ***
          // extensions: [angularPlugin, clickPluginInstance],
              extensionConfig: {
                  [angularPlugin.identifier]: { router: this.router }
              // *** Add the Click Analytics plug-in. ***
              // [clickPluginInstance.identifier]: clickPluginConfig
              }
          } 
      });
      appInsights.loadAppInsights();
  }
}
