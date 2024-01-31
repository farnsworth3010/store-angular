import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzHeaderComponent } from 'ng-zorro-antd/layout';
import { HeaderComponent } from '../../shared/header/header.component';
import { BannerComponent } from './banner/banner.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NzHeaderComponent, HeaderComponent, BannerComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {}
