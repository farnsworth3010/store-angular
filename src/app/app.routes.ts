import { Routes } from '@angular/router';
import { authGuard } from './core/services/auth.service';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./modules/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'shop',
    loadComponent: () =>
      import('./modules/shop/shop.component').then(m => m.ShopComponent),
  },
  {
    path: 'account',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/account/account.component').then(
        m => m.AccountComponent
      ),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/admin/admin.component').then(m => m.AdminComponent),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./modules/product/product.component').then(
        m => m.ProductComponent
      ),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./modules/blog/blog.component').then(m => m.BlogComponent),
  },
];
