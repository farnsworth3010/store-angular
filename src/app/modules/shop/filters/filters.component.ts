import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import {
  NzCollapseComponent,
  NzCollapsePanelComponent,
} from 'ng-zorro-antd/collapse';
import { Categories } from '../../../core/constants/categories';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { Category } from '../../../core/interfaces/categories';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
import {
  NzCheckboxComponent,
  NzCheckboxWrapperComponent,
} from 'ng-zorro-antd/checkbox';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';

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
export class FiltersComponent {
  categories: Category[] = Categories;
  radioValue: string = 'red';
}
