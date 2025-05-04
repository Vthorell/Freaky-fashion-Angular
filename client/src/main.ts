
import { provideHttpClient } from '@angular/common/http';  // Importera HttpClientModule
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),  // Lägg till HttpClientModule här
  ]
})
.catch(err => console.error(err));
