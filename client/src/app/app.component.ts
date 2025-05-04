import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // Importera HttpClientModule

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterOutlet, // Endast RouterModule här
    HttpClientModule  // Lägg till HttpClientModule här
  ]
})
export class AppComponent {
  title = 'Din App';
}


