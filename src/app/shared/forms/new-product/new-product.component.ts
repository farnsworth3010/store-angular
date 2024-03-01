import { NzInputGroupComponent, NzInputModule } from 'ng-zorro-antd/input';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  Validators,
  ReactiveFormsModule,
  FormBuilder,
  FormsModule,
} from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { ShopService } from '../../../core/services/shop/shop.service';
import { ApiResponse } from '../../../core/interfaces/response';
import { Brand } from '../../../core/interfaces/brand';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NewProductInput, Product } from '../../../core/interfaces/product';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    NzFormModule,
    NzInputGroupComponent,
    NzSelectModule,
    ReactiveFormsModule,
    NzInputModule,
    NzUploadModule,
    NzButtonModule,
    NzAutocompleteModule,
    FormsModule,
  ],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProductComponent implements OnInit {
  @Output() submitFormEvent = new EventEmitter<NewProductInput>();
  constructor(
    private fb: FormBuilder,
    private shop: ShopService,
    private changeDetector: ChangeDetectorRef,
    private destroyRef: DestroyRef
  ) {}
  @Input() data: Product | null = null;
  ngOnInit(): void {
    this.shop
      .getBrands()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: ApiResponse<Brand>) => {
        this.brands = res.data.map(el => el.Name);
        this.changeDetector.markForCheck();
      });
    this.productForm.setValue({
      title: this.data?.title ?? '',
      brand: this.data?.brand_id ?? 1,
      shortDescription: this.data?.short_description ?? '',
      description: this.data?.description ?? '',
      price: this.data?.price ?? 1,
    });
  }
  brands: string[] = [];
  productForm = this.fb.group({
    title: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    shortDescription: ['', [Validators.required]],
    description: ['', [Validators.required]],
    brand: [1, [Validators.required]],
  });
}
