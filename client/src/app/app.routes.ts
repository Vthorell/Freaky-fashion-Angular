import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { ProductCreateComponent } from './admin/product-create/product-create.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

// app.routes.ts
// I dina routes
export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
      path: 'admin',
      component: AdminLayoutComponent,
      children: [
        { path: '', component: AdminComponent, data: { section: 'dashboard' } },
        { path: 'products', component: ProductListComponent, data: { section: 'products' } },
        { path: 'products/new', component: ProductCreateComponent, data: { section: 'products-new' } }
      ]
    },
    { path: 'search', component: SearchResultsComponent },
    {path: 'product/:slug', component: ProductDetailComponent },
  ];
  

