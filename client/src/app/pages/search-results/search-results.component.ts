import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../../components/header/header.component';
import { Product } from '../../models/product.model';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchTerm: string = '';
  products: Product[] = [];
  loading: boolean = true;
  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['term'] || '';
      if (this.searchTerm) {
        this.searchProducts();
      } else {
        this.loading = false;
      }
    });
  }
  
  searchProducts() {
    this.loading = true;
    const apiUrl = `http://localhost:8080/api/products/search?term=${encodeURIComponent(this.searchTerm)}`;
    
    this.http.get<Product[]>(apiUrl).subscribe(
      (products) => {
        this.products = products;
        this.loading = false;
      },
      (error) => {
        console.error('Fel vid sökning:', error);
        this.loading = false;
      }
    );
  }
}
