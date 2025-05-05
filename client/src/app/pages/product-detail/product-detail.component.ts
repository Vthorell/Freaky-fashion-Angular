import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, ProductCardComponent, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  relatedProducts: Product[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    // Lyssna på förändringar i paramMap (slug)
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.loadProduct(slug);
      }
    });
  }

  // Ladda produkt och relaterade produkter
  private loadProduct(slug: string): void {
    this.productService.getProducts().subscribe(products => {
      this.product = products.find(p => p.slug === slug) || null;

      if (this.product) {
        this.productService.getRelatedProducts(slug).subscribe(relatedProducts => {
          this.relatedProducts = relatedProducts;
        });
      }
    });
  }
}


