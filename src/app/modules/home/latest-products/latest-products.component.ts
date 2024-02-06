import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturedProduct } from '../../../core/interfaces/featuredProduct';
import { ProductComponent } from '../../../shared/product/product.component';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-latest-products',
  standalone: true,
  imports: [ProductComponent, NzRowDirective, NzColDirective],
  templateUrl: './latest-products.component.html',
  styleUrl: './latest-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LatestProductsComponent {
  mockData: FeaturedProduct[] = [
    {
      title: "Men's Essential Tee",
      image: '../../../../assets/home/latest/1.jfif',
      // exampleColor: 'black',
      price: 32,
      colors: ['#2091F9', '#2DC071', '#E77C40', '#252B42'],
      sizes: ['XL', 'L', 'M', 'S'],
    },
    {
      title: "Men's Essential Tee",
      image: '../../../../assets/home/latest/2.jfif',
      // exampleColor: 'black',
      price: 32,
      colors: ['#2091F9', '#2DC071', '#E77C40', '#252B42'],
      sizes: ['XL', 'L', 'M', 'S'],
    },
    {
      title: "Men's Essential Tee",
      image: '../../../../assets/home/latest/3.jfif',
      // exampleColor: 'black',
      price: 32,
      colors: ['blue', 'green', 'orange', 'black'],
      sizes: ['XL', 'L', 'M', 'S'],
    },
    {
      title: "Men's Essential Tee",
      image: '../../../../assets/home/latest/4.jfif',
      // exampleColor: 'black',
      price: 32,
      colors: ['blue', 'green', 'orange', 'black'],
      sizes: ['XL', 'L', 'M', 'S'],
    },
    {
      title: "Men's Essential Tee",
      image: '../../../../assets/home/latest/5.jfif',
      // exampleColor: 'black',
      price: 32,
      colors: ['blue', 'green', 'orange', 'black'],
      sizes: ['XL', 'L', 'M', 'S'],
    },
    {
      title: "Men's Essential Tee",
      image: '../../../../assets/home/latest/6.jfif',
      // exampleColor: 'black',
      price: 32,
      colors: ['blue', 'green', 'orange', 'black'],
      sizes: ['XL', 'L', 'M', 'S'],
    },
    {
      title: "Men's Essential Tee",
      image: '../../../../assets/home/latest/7.jfif',
      // exampleColor: 'black',
      price: 32,
      colors: ['blue', 'green', 'orange', 'black'],
      sizes: ['XL', 'L', 'M', 'S'],
    },
    {
      title: "Men's Essential Tee",
      image: '../../../../assets/home/latest/8.jfif',
      // exampleColor: 'black',
      price: 32,
      colors: ['blue', 'green', 'orange', 'black'],
      sizes: ['XL', 'L', 'M', 'S'],
    },
  ];
}
