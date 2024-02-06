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
import { FeaturedProduct } from '../../core/interfaces/featuredProduct';
import { ProductComponent } from '../../shared/product/product.component';
import { FiltersComponent } from './filters/filters.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../../core/services/shop.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';

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
  data: FeaturedProduct[] | null = null;
  viewType: 'list' | 'grid' = 'grid';
  ngOnInit() {
    this.shop
      .getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: FeaturedProduct[]) => {
        this.data = res;
        this.changeDetector.markForCheck();
      });
  }

  toggleView(type: 'list' | 'grid'): void {
    this.viewType = type;
    this.changeDetector.markForCheck();
  }
}
