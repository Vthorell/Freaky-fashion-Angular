import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  description: string;
  image_url: string;
  slug: string;
  brand: string;
  localImageUrl: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';
  private imageBasePath = '/assets/images/';

  constructor(private http: HttpClient) {}

  // Hämtar alla produkter
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      // Logga rådata från API:et
      tap(products => console.log('Rådata från API:', products)),
      map(products => products.map(product => {
        const localPath = this.getLocalImagePath(product.image_url);
        console.log(`Konverterar bild: ${product.image_url} -> ${localPath}`);
        
        return {
          ...product,
          localImageUrl: localPath
        };
      })),
      tap(processedProducts => console.log('Processerade produkter:', processedProducts))
    );
  }

  // Hämtar relaterade produkter baserat på slug
  getRelatedProducts(slug: string): Observable<Product[]> {
    const relatedUrl = `${this.apiUrl}/${slug}/related`;
    return this.http.get<Product[]>(relatedUrl).pipe(
      tap(related => console.log('Relaterade produkter:', related)),
      map(related => related.map(product => {
        const localPath = this.getLocalImagePath(product.image_url);
        console.log(`Konverterar bild: ${product.image_url} -> ${localPath}`);
        
        return {
          ...product,
          localImageUrl: localPath
        };
      })),
      tap(processedRelated => console.log('Processerade relaterade produkter:', processedRelated))
    );
  }

  private getLocalImagePath(apiImageUrl: string): string {
    if (!apiImageUrl) {
      console.warn('Varning: image_url är tom/undefined');
      return `${this.imageBasePath}placeholder.png`;
    }
    
    const filename = apiImageUrl.split('/').pop() || '';
    return `${this.imageBasePath}${filename}`;
  }
}
