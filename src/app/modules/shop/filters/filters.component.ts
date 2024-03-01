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
import { Category } from '../../../core/interfaces/categories';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
import {
  NzCheckboxComponent,
  NzCheckboxWrapperComponent,
} from 'ng-zorro-antd/checkbox';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { ShopService } from '../../../core/services/shop/shop.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
  categories: Category[] | null = null;
  radioValue: string = 'red';

  constructor(
    private shop: ShopService,
    private destroyRef: DestroyRef,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.shop
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: Category[]) => {
        this.categories = res;
        this.changeDetector.markForCheck();
      });
  }
}
