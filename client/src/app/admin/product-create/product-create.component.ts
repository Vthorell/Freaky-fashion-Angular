import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm: FormGroup;
  submitted = false;
  
  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private router: Router
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      image_url: ['', Validators.required],
      brand: ['', Validators.required],
      sku: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    // Initiering kan göras här om det behövs
  }
  
  onSubmit(): void {
    this.submitted = true;
    
    // Stoppa här om formuläret är ogiltigt
    if (this.productForm.invalid) {
      return;
    }
    
    // Skicka data till API
    this.http.post('http://localhost:8080/api/products', this.productForm.value)
      .subscribe(
        response => {
          console.log('Produkt sparad', response);
          // Navigera tillbaka till produktlistan
          this.router.navigate(['/admin/products']);
        },
        error => {
          console.error('Fel vid sparande av produkt:', error);
        }
      );
  }
  
  cancel(): void {
    // Navigera tillbaka till produktlistan utan att spara
    this.router.navigate(['/admin/products']);
  }
}