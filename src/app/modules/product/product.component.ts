import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzHeaderComponent } from 'ng-zorro-antd/layout';
import { HeaderComponent } from '../../shared/header/header.component';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTabComponent, NzTabSetComponent } from 'ng-zorro-antd/tabs';
import { NzImageDirective, NzImageModule } from 'ng-zorro-antd/image';

import { imageFallback } from '../../core/constants/imageFallback';
import { NzRateComponent } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { ColorsComponent } from '../../shared/colors/colors.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { Product } from '../../core/interfaces/product';
import { productData } from '../../core/constants/productData';
import { CurrencyPipe } from '@angular/common';
import { error } from '@angular/compiler-cli/src/transformers/util';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NzHeaderComponent,
    HeaderComponent,
    NzCardComponent,
    NzTabComponent,
    NzTabSetComponent,
    NzImageDirective,
    NzImageModule,
    NzRateComponent,
    FormsModule,
    ColorsComponent,
    NzButtonComponent,
    CurrencyPipe,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  protected readonly imageFallback = imageFallback;
  protected readonly productData = productData;
  protected readonly error = error;
  data: Product = productData;
  // image: string | null = null;
  //
  // ngOnInit() {
  //   this.image = this.data.images[0]!;
  // }
}
