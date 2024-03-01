import { ApiPostResponse } from './../../../core/interfaces/response';
import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzModalComponent, NzModalService } from 'ng-zorro-antd/modal';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { Observable, delay } from 'rxjs';
import { agreementText } from '../../../core/constants/agreement';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    NzFormControlComponent,
    NzFormLabelComponent,
    NzFormItemComponent,
    NzFormDirective,
    ReactiveFormsModule,
    NzColDirective,
    NzInputDirective,
    NzInputGroupComponent,
    NzSelectComponent,
    NzOptionComponent,
    NzRowDirective,
    NzButtonComponent,
    NzCheckboxComponent,
    NzModalComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  constructor(
    private fb: NonNullableFormBuilder,
    private auth: AuthService,
    private destroyRef: DestroyRef,
    private modal: NzModalService
  ) {}

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  validateForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    checkPassword: [
      '',
      [
        Validators.required,
        this.confirmationValidator,
        Validators.minLength(8),
      ],
    ],
    firstname: ['', [Validators.required]],
    phoneNumberPrefix: '+375',
    phoneNumber: ['', [Validators.required]],
    agree: [false, [Validators.requiredTrue]],
  });

  submitForm(): Observable<number> {
    return new Observable<number>(subscriber => {
      if (this.validateForm.valid && this.validateForm.getRawValue().agree) {
        const { email, password, phoneNumber, phoneNumberPrefix, firstname } =
          this.validateForm.getRawValue();
        this.auth
          .signUp({
            email,
            password,
            phoneNumber: phoneNumberPrefix + phoneNumber,
            firstname,
          })
          .pipe(takeUntilDestroyed(this.destroyRef), delay(500))
          .subscribe({
            next: (res: ApiPostResponse) => {
              subscriber.next(res.id);
            },
            error: () => {
              subscriber.error();
            },
          });
      } else {
        subscriber.next(0);
        Object.values(this.validateForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    });
  }

  agreement($event: Event): void {
    $event.stopPropagation();
    this.validateForm.controls.agree.setValue(
      !this.validateForm.getRawValue().agree // fix
    );
    this.modal.info({
      nzTitle: 'User agreement',
      nzCentered: true,
      nzCancelText: 'Deny',
      nzOkText: 'Apply',
      nzContent: agreementText,
      nzWidth: '70vw',
      nzBodyStyle: {
        overflowY: 'scroll',
        height: '70vh',
      },
      nzOnOk: () => this.validateForm.controls.agree.setValue(true),
      nzOnCancel: () => this.validateForm.controls.agree.setValue(false),
    });
  }
}
