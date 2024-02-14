import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { ColorsComponent } from '../colors/colors.component';
import { imageFallback } from '../../core/constants/imageFallback';
import { Product } from '../../core/interfaces/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NzImageModule,
    NzButtonComponent,
    NzIconDirective,
    CurrencyPipe,
    TitleCasePipe,
    ColorsComponent,
    RouterLink,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  @Input() showSizes: boolean = false;
  @Input() showColors: boolean = false;
  @Input() data!: Product;
  @Input({ required: true }) imageType!: 'tall' | 'wide' | 'square';
  @Input() viewType: 'grid' | 'list' = 'grid';
  @HostBinding('class.list') get isList() {
    return this.viewType === 'list';
  }
  constructor(private changeDetector: ChangeDetectorRef) {}
  protected readonly imageFallback = imageFallback;
  protected readonly toString = toString;
}
