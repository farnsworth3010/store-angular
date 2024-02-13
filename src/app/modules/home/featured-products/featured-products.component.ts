import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzTabComponent, NzTabSetComponent } from 'ng-zorro-antd/tabs';
import { ProductComponent } from '../../../shared/product/product.component';
import { Product } from '../../../core/interfaces/product';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [NzTabSetComponent, NzTabComponent, ProductComponent],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedProductsComponent {
  data: Product[] | null = null;
}
