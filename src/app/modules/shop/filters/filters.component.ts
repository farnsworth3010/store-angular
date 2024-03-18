import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import {
  NzCollapseComponent,
  NzCollapsePanelComponent,
} from 'ng-zorro-antd/collapse';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FullCategory } from '../../../core/interfaces/categories';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NzCheckboxComponent,
  NzCheckboxWrapperComponent,
} from 'ng-zorro-antd/checkbox';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { ShopService } from '../../../core/services/shop/shop.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiResponse } from '../../../core/interfaces/response';
import { Brand } from '../../../core/interfaces/brand';
import { FiltersService } from '../../../core/services/filters/filters.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    NzCardComponent,
    NzInputDirective,
    NzInputGroupComponent,
    NzIconDirective,
    NzCollapseComponent,
    NzCollapsePanelComponent,
    NzButtonComponent,
    NzRadioGroupComponent,
    NzRadioComponent,
    FormsModule,
    NzCheckboxWrapperComponent,
    NzRowDirective,
    NzColDirective,
    NzCheckboxComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
  categories: FullCategory[] | null = null;
  radioValue: string = 'red';

  constructor(
    private shop: ShopService,
    private destroyRef: DestroyRef,
    private changeDetector: ChangeDetectorRef,
    public filters: FiltersService,
    private fb: FormBuilder
  ) {}
  brands: Brand[] = [];
  filtersForm = this.fb.group({
    brand_id: [this.filters.filters.getValue().brand_id],
  });
  ngOnInit() {
    this.filtersForm.valueChanges.subscribe(() => {
      this.filters.setFilter({
        name: 'brand_id',
        value: this.filtersForm.getRawValue().brand_id!,
      });
    });
    this.shop
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: FullCategory[]) => {
        this.categories = res;
        this.changeDetector.markForCheck();
      });
    this.shop
      .getBrands()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: ApiResponse<Brand>) => {
        this.brands = res.data;
        console.log(res);
        this.changeDetector.markForCheck();
      });
  }
}
