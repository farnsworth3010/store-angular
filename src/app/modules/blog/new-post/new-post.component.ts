import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  NzFormControlComponent,
  NzFormItemComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzColDirective } from 'ng-zorro-antd/grid';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { ShopService } from '../../../core/services/shop/shop.service';
import { NewBlogPostInput } from '../../../core/interfaces/blogPost';
import { NzCardComponent } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormItemComponent,
    NzInputGroupComponent,
    NzFormControlComponent,
    NzColDirective,
    NzButtonComponent,
    NzInputDirective,
    NzCardComponent,
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPostComponent {
  validateForm: FormGroup<{
    title: FormControl<string>;
    text: FormControl<string>;
  }> = this.fb.group({
    title: ['', [Validators.required]],
    text: ['', [Validators.required]],
  });
  @Output() formSubmit = new EventEmitter<NewBlogPostInput>();
  @Input() sending: boolean = false;
  submitForm(): void {
    if (this.validateForm.valid) {
      const { title, text } = this.validateForm.getRawValue();
      this.formSubmit.emit({
        title,
        text,
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private shop: ShopService,
    private changeDetector: ChangeDetectorRef
  ) {}
}
