import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NzImageModule, NzButtonComponent, NzIconDirective, CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  @Input() data = null;
}
