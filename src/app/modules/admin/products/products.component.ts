import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ShopService } from '../../../core/services/shop.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, delay } from 'rxjs';
import { Product, ProductInput } from '../../../core/interfaces/product';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NewProductComponent } from '../../../shared/forms/new-product/new-product.component';
import { ApiPaginatedResponse } from '../../../core/interfaces/response';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NzListModule,
    NzIconDirective,
    NzPaginationComponent,
    NzInputGroupComponent,
    ReactiveFormsModule,
    NzTabsModule,
    CurrencyPipe,
    RouterLink,
    NzToolTipModule,
    NzTableModule,
    NzCardComponent,
    NzPopconfirmModule,
    NzModalModule,
    NzButtonModule,
    NewProductComponent,
  ],
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
  @ViewChild(NewProductComponent) newProductForm!: NewProductComponent;
  ngOnInit(): void {
    this.shop
      .getProducts(this.page, this.pageSize)
      .pipe(delay(500), takeUntilDestroyed(this.destroyRef))
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
              this.total = res.total;
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
  deleteProduct(ID: number): void {
    this.shop.deleteProduct(ID).subscribe(() => {
      this.data = this.data?.filter(el => el.ID !== ID) ?? [];
      this.changeDetector.markForCheck();
    });
  }
  searchControl = new FormControl<string>('');
  isModalVisible: boolean = false;
  showModal() {
    this.isModalVisible = !this.isModalVisible;
  }
  handleCancel() {
    this.isModalVisible = false;
  }
  handleOk() {
    console.log('sdf');
    if (this.newProductForm.productForm.valid) {
      const { title, price, description, shortDescription } =
        this.newProductForm.productForm.getRawValue();
      this.submitProduct({
        title: title!,
        price: price!,
        description: description!,
        short_description: shortDescription!,
        brand_id: 1, // fix
      });
    }
  }
  submitProduct(product: ProductInput) {
    this.shop.createProduct(product).subscribe(() => {
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
      this.isModalVisible = false;
    });
  }
}
