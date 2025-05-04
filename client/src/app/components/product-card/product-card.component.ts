
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() name!: string;
  @Input() brand!: string;
  @Input() price!: number;
  @Input() imageUrl!: string;
  @Input() id!: number;
  @Input() slug!: string;

  ngOnInit() {
    console.log('Product Card Initialized:', {
      name: this.name,
      brand: this.brand,
      price: this.price,
      imageUrl: this.imageUrl
    });
    
    // Verifiera bildvägen
    if (!this.imageUrl) {
      console.warn(`Varning: imageUrl är undefined/tom för produkt '${this.name}'`);
    } else if (this.imageUrl.startsWith('/assets/')) {
      console.log(`OK: Bildväg '${this.imageUrl}' verkar vara en lokal sökväg`);
    }
  }
}