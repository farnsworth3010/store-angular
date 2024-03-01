import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
} from 'ng-zorro-antd/form';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { Observable, delay } from 'rxjs';

import { NzAlertComponent } from 'ng-zorro-antd/alert';
import { AuthService } from '../../../core/services/auth/auth.service';

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
    NzAlertComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private destroyRef: DestroyRef,
    private changeDetector: ChangeDetectorRef
  ) {}

  validateForm: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    remember: [true],
  });

  failedSignIn: boolean = false;

  submitForm(): Observable<string> {
    return new Observable<string>(subscriber => {
      if (this.validateForm.valid) {
        const { email, password } = this.validateForm.getRawValue();
        this.auth
          .signIn({ email: email!, password: password! })
          .pipe(takeUntilDestroyed(this.destroyRef), delay(500))
          .subscribe({
            next: ({ token }: { token: string }) => {
              subscriber.next(token);
            },
            error: () => {
              this.failedSignIn = true;
              this.changeDetector.markForCheck();
              subscriber.error();
            },
          });
      } else {
        Object.values(this.validateForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
        subscriber.next('');
      }
    });
  }
}
