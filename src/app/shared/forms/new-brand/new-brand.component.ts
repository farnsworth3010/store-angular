import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
} from '@angular/core';
import { Brand } from '../../../core/interfaces/brand';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ShopService } from '../../../core/services/shop/shop.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputGroupComponent, NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-new-brand',
  standalone: true,
  imports: [
    NzFormModule,
    NzInputGroupComponent,
    ReactiveFormsModule,
    NzInputModule,
    FormsModule,
  ],
  templateUrl: './new-brand.component.html',
  styleUrl: './new-brand.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewBrandComponent {
  @Input() data!: Brand;
  constructor(
    private fb: FormBuilder,
    private shop: ShopService,
    private changeDetector: ChangeDetectorRef,
    private destroyRef: DestroyRef
  ) {}
  brandForm = this.fb.group({
    Name: ['', [Validators.required]],
  });
}
