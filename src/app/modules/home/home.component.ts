import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { CategoriesComponent } from './categories/categories.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { LatestProductsComponent } from './latest-products/latest-products.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { NzHeaderComponent } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NzButtonComponent,
    CategoriesComponent,
    FeaturedProductsComponent,
    NzDividerComponent,
    LatestProductsComponent,
    HeaderComponent,
    NzHeaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
