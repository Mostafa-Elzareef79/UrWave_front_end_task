import { provideRouter, Routes } from '@angular/router';
import { ProductSearchComponent } from '../core/product-managment/product-search/product-search.component';

export const routes: Routes = [
    { path: '', redirectTo: 'product-managment', pathMatch: 'full' }, 
    { path: 'product-managment', component: ProductSearchComponent }, 
  ];
  export const appRouting = provideRouter(routes);