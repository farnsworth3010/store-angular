import { Routes } from '@angular/router';
import { authGuard } from './core/services/auth/auth.service';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
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
    path: 'panel',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/panel/panel.component').then(m => m.PanelComponent),
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
  {
    path: 'cart',
    loadComponent: () =>
      import('./modules/cart/cart.component').then(m => m.CartComponent),
  },
];
