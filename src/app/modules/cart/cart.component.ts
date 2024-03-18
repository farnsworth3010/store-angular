import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ProductComponent } from '../../shared/product/product.component';
import { Product } from '../../core/interfaces/product';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NzCardModule, ProductComponent, NzEmptyModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  data: Product | null = null;
  myCartText: string = $localize`Моя корзина`;
}
