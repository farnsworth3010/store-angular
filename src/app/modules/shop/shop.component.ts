import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { NzHeaderComponent } from 'ng-zorro-antd/layout';
import { HeaderComponent } from '../../shared/header/header.component';
import { BannerComponent } from './banner/banner.component';
import { ProductComponent } from '../../shared/product/product.component';
import { FiltersComponent } from './filters/filters.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopService } from '../../core/services/shop.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { Product } from '../../core/interfaces/product';
import { debounceTime, delay } from 'rxjs';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { ApiPaginatedResponse } from '../../core/interfaces/response';

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
    NzEmptyComponent,
    NzSpinComponent,
    NzInputGroupComponent,
    ReactiveFormsModule,
    NzInputDirective,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent implements OnInit {
  constructor(
    private changeDetector: ChangeDetectorRef,
    public shop: ShopService,
    private destroyRef: DestroyRef
  ) {}
  data: Product[] | null = null;
  total: number = 0;
  viewType: 'list' | 'grid' = 'grid';
  page: number = 1;
  pageSize: number = 20;
  fetching: boolean = true;

  searchControl = new FormControl('');
  ngOnInit() {
    this.shop
      .getProducts(this.page, this.pageSize)
      .pipe(takeUntilDestroyed(this.destroyRef), delay(1000))
      .subscribe((res: ApiPaginatedResponse<Product>) => {
        this.fetching = false;
        this.data = res.data;
        this.total = res.total;
        this.changeDetector.markForCheck();
      });
    this.searchControl.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe((value: string | null) => {
        if (value) {
          this.fetching = true;
          this.changeDetector.markForCheck();
          this.shop
            .getProductsByName(value)
            .pipe(takeUntilDestroyed(this.destroyRef), delay(300))
            .subscribe((res: ApiPaginatedResponse<Product>) => {
              this.data = res.data;
              this.changeDetector.markForCheck();
              this.fetching = false;
            });
        } else {
          this.fetching = true;
          this.changeDetector.markForCheck();
          this.shop
            .getProducts(this.page, this.pageSize)
            .pipe(takeUntilDestroyed(this.destroyRef), delay(1000))
            .subscribe((res: ApiPaginatedResponse<Product>) => {
              this.fetching = false;
              this.data = res.data;
              this.total = res.total;
              this.changeDetector.markForCheck();
            });
        }
      });
  }

  toggleView(type: 'list' | 'grid'): void {
    this.viewType = type;
    this.changeDetector.markForCheck();
  }
  pageIndexChange(page: number) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.page = page;
    this.fetching = true;
    this.shop
      .getProducts(page, 20)
      .pipe(takeUntilDestroyed(this.destroyRef), delay(1000))
      .subscribe((res: ApiPaginatedResponse<Product>) => {
        this.data = res.data;
        this.total = res.total;
        this.fetching = false;
        this.changeDetector.markForCheck();
      });
  }
}
