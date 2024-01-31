import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzTabComponent, NzTabSetComponent } from 'ng-zorro-antd/tabs';
import { ProductComponent } from '../../../shared/product/product.component';
import { FeaturedProduct } from '../../../core/interfaces/featuredProduct';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [NzTabSetComponent, NzTabComponent, ProductComponent],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedProductsComponent {
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
  ];
}
