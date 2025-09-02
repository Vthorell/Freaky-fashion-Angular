import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchControl = new FormControl(''); 
  
  constructor(private router: Router) {}

  onSearch() {
    const term = this.searchControl.value?.trim();
    if (term) {
      this.router.navigate(['/search'], {
        queryParams: { term: encodeURIComponent(term) } 
      });
    }
  }
  
}
