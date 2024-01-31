import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzHeaderComponent } from 'ng-zorro-antd/layout';
import { HeaderComponent } from '../../shared/header/header.component';
import { BannerComponent } from './banner/banner.component';
import { FeaturedProduct } from '../../core/interfaces/featuredProduct';
import { ProductComponent } from '../../shared/product/product.component';
import { FiltersComponent } from './filters/filters.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    NzHeaderComponent,
    HeaderComponent,
    BannerComponent,
    ProductComponent,
    FiltersComponent,
    NzButtonComponent,
    NzIconDirective,
    NzSelectComponent,
    NzOptionComponent,
    NzPaginationComponent,
    FormsModule,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {
  mockData: FeaturedProduct[] = [
    {
      title: "Men's Essential Tee",
      image: '../../../../assets/home/featured/mock1.jfif',
      exampleColor: 'black',
      price: 32,
      colors: ['#2091F9', '#2DC071', '#E77C40', '#252B42'],
      sizes: ['XL', 'L', 'M', 'S'],
    },
    {
      title: "Men's Essential Tee",
      image: '../../../../assets/home/featured/mock2.jfif',
      exampleColor: 'black',
      price: 32,
      colors: ['#2091F9', '#2DC071', '#E77C40', '#252B42'],
      sizes: ['XL', 'L', 'M', 'S'],
    },
    {
      title: "Men's Essential Tee",
      image: '../../../../assets/home/featured/mock3.jfif',
      exampleColor: 'black',
      price: 32,
      colors: ['blue', 'green', 'orange', 'black'],
      sizes: ['XL', 'L', 'M', 'S'],
    },
    {
      title: "Men's Essential Tee",
      image: '../../../../assets/home/featured/mock4.jfif',
      exampleColor: 'black',
      price: 32,
      colors: ['blue', 'green', 'orange', 'black'],
      sizes: ['XL', 'L', 'M', 'S'],
    },
    {
      title: "Men's Essential Tee",
      image: '../../../../assets/home/featured/mock4.jfif',
      exampleColor: 'black',
      price: 32,
      colors: ['blue', 'green', 'orange', 'black'],
      sizes: ['XL', 'L', 'M', 'S'],
    },
    {
      title: "Men's Essential Tee",
      image: '../../../../assets/home/featured/mock4.jfif',
      exampleColor: 'black',
      price: 32,
      colors: ['blue', 'green', 'orange', 'black'],
      sizes: ['XL', 'L', 'M', 'S'],
    },
    {
      title: "Men's Essential Tee",
      image: '../../../../assets/home/featured/mock4.jfif',
      exampleColor: 'black',
      price: 32,
      colors: ['blue', 'green', 'orange', 'black'],
      sizes: ['XL', 'L', 'M', 'S'],
    },
    {
      title: "Men's Essential Tee",
      image: '../../../../assets/home/featured/mock4.jfif',
      exampleColor: 'black',
      price: 32,
      colors: ['blue', 'green', 'orange', 'black'],
      sizes: ['XL', 'L', 'M', 'S'],
    },
    {
      title: "Men's Essential Tee",
      image: '../../../../assets/home/featured/mock4.jfif',
      exampleColor: 'black',
      price: 32,
      colors: ['blue', 'green', 'orange', 'black'],
      sizes: ['XL', 'L', 'M', 'S'],
    },
    {
      title: "Men's Essential Tee",
      image: '../../../../assets/home/featured/mock4.jfif',
      exampleColor: 'black',
      price: 32,
      colors: ['blue', 'green', 'orange', 'black'],
      sizes: ['XL', 'L', 'M', 'S'],
    },
    {
      title: "Men's Essential Tee",
      image: '../../../../assets/home/featured/mock4.jfif',
      exampleColor: 'black',
      price: 32,
      colors: ['blue', 'green', 'orange', 'black'],
      sizes: ['XL', 'L', 'M', 'S'],
    },
    {
      title: "Men's Essential Tee",
      image: '../../../../assets/home/featured/mock4.jfif',
      exampleColor: 'black',
      price: 32,
      colors: ['blue', 'green', 'orange', 'black'],
      sizes: ['XL', 'L', 'M', 'S'],
    },
    {
      title: "Men's Essential Tee",
      image: '../../../../assets/home/featured/mock4.jfif',
      exampleColor: 'black',
      price: 32,
      colors: ['blue', 'green', 'orange', 'black'],
      sizes: ['XL', 'L', 'M', 'S'],
    },
    {
      title: "Men's Essential Tee",
      image: '../../../../assets/home/featured/mock4.jfif',
      exampleColor: 'black',
      price: 32,
      colors: ['blue', 'green', 'orange', 'black'],
      sizes: ['XL', 'L', 'M', 'S'],
    },
  ];
  viewType: 'list' | 'grid' = 'grid';
  toggleView(type: 'list' | 'grid'): void {
    this.viewType = type;
  }
}
