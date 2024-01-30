import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzTabComponent, NzTabSetComponent } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [NzTabSetComponent, NzTabComponent],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedProductsComponent {}
