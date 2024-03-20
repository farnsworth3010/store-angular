import { Brand } from './../../../core/interfaces/brand';
import { ApiResponse } from './../../../core/interfaces/response';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ShopService } from '../../../core/services/shop/shop.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NewProductComponent } from '../../../shared/forms/new-product/new-product.component';
import { NewBrandComponent } from '../../../shared/forms/new-brand/new-brand.component';
import { BrandsService } from '../../../core/services/brands/brands.service';
import { FiltersService } from '../../../core/services/filters/filters.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
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
    NewBrandComponent,
  ],
})
export class BrandsComponent implements OnInit {
  constructor(
    private shop: ShopService,
    private destroyRef: DestroyRef,
    private changeDetector: ChangeDetectorRef,
    private brandsService: BrandsService,
    private filtersService: FiltersService,
    private router: Router
  ) {}

  data: Brand[] | null = null;
  brand: Brand | null = null;
  fetching: boolean = true;
  @ViewChild(NewBrandComponent) newBrandForm!: NewBrandComponent;

  fetchBrands() {
    this.fetching = true;
    this.brandsService
      .getBrands()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: ApiResponse<Brand>) => {
        this.fetching = false;
        this.data = data.data;
        this.changeDetector.markForCheck();
      });
  }

  ngOnInit(): void {
    this.fetchBrands();
  }

  deleteBrand(ID: number): void {
    this.brandsService.deleteBrand(ID).subscribe(() => {
      this.data = this.data?.filter(el => el.ID !== ID) ?? [];
      this.changeDetector.markForCheck();
    });
  }

  isModalVisible: boolean = false;

  showProductsOfBrand(brand_id: number): void {
    this.filtersService.setFilter({ name: 'brand_id', value: brand_id });
    this.router.navigateByUrl('/shop');
  }

  showModal() {
    this.changeDetector.markForCheck();
    this.isModalVisible = !this.isModalVisible;
  }

  handleCancel() {
    this.isModalVisible = false;
  }

  handleOk() {
    if (this.newBrandForm.brandForm.valid) {
      const { Name } = this.newBrandForm.brandForm.getRawValue();
      this.brandsService
        .createBrand(Name!)
        .subscribe(({ id }: { id: number }) => {
          if (id) {
            this.fetchBrands();
            this.isModalVisible = false;
          }
        });
    }
  }
}
