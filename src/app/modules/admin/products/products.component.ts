import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ShopService } from '../../../core/services/shop.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay } from 'rxjs';
import { Product, ResponseProduct } from '../../../core/interfaces/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NzListModule,
    NzIconDirective,
    NzPaginationComponent,
    NzInputGroupComponent,
    ReactiveFormsModule,
    NzTabsModule,
    CurrencyPipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  constructor(
    private shop: ShopService,
    private destroyRef: DestroyRef,
    private changeDetector: ChangeDetectorRef
  ) {}
  page: number = 0;
  pageSize: number = 50;
  total: number = 0;
  data: Product[] | null = null;
  fetching: boolean = true;
  ngOnInit(): void {
    this.shop
      .getProducts(this.page, this.pageSize)
      .pipe(takeUntilDestroyed(this.destroyRef), delay(1000))
      .subscribe((res: ResponseProduct) => {
        this.fetching = false;
        this.data = res.data;
        this.total = res.total;
        this.changeDetector.markForCheck();
      });
  }
  searchControl = new FormControl<string>('');
}
