import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  imports: [RouterModule, CommonModule]  // Importera RouterModule här för admin routing
})
// admin-layout.component.ts
export class AdminLayoutComponent implements OnInit {
  currentSection: string = '';
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit() {
    // Lyssna på route-ändringar för att uppdatera sektionen
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        if (child?.snapshot.data['section']) {
          return child.snapshot.data['section'];
        }
        return '';
      })
    ).subscribe(section => {
      this.currentSection = section;
    });
  }
}
