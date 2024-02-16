import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { ShopService } from '../../../core/services/shop.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JWTToken } from '../../../core/interfaces/user';
import { delay, Observable } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzFormItemComponent,
    NzInputGroupComponent,
    NzFormControlComponent,
    ReactiveFormsModule,
    NzFormDirective,
    NzInputDirective,
    NzCheckboxComponent,
    NzColDirective,
    NzRowDirective,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  constructor(
    private fb: FormBuilder,
    private shop: ShopService,
    private destroyRef: DestroyRef
  ) {}
  submitForm(): Observable<string> {
    return new Observable<string>(subscriber => {
      if (this.validateForm.valid) {
        const { email, password } = this.validateForm.getRawValue();
        this.shop
          .signIn({ email: email!, password: password! })
          .pipe(takeUntilDestroyed(this.destroyRef), delay(1000))
          .subscribe((res: JWTToken) => {
            subscriber.next(res.token);
          });
      }
      subscriber.next('');
    });
  }
  validateForm: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    remember: FormControl<boolean | null>;
  }> = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
    remember: [true],
  });
}
