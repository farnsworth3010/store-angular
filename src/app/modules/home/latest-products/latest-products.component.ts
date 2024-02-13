import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ProductComponent } from '../../../shared/product/product.component';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { ShopService } from '../../../core/services/shop.service';
import { Product, ResponseProduct } from '../../../core/interfaces/product';

@Component({
  selector: 'app-latest-products',
  standalone: true,
  imports: [ProductComponent, NzRowDirective, NzColDirective],
  templateUrl: './latest-products.component.html',
  styleUrl: './latest-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LatestProductsComponent implements OnInit {
  data: Product[] | null = null;
  constructor(
    private shop: ShopService,
    private changeDetector: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.shop.getLatestProduct().subscribe((res: ResponseProduct) => {
      this.data = res.data;
      this.changeDetector.markForCheck();
    });
  }
}
