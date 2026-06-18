import { Routes } from '@angular/router';

import { App } from './app';

import { ProductDetail }
from './pages/product-detail/product-detail';

export const routes: Routes = [

  {
    path: '',
    component: App
  },

  {
    path: 'producto/:id',
    component: ProductDetail
  }

];