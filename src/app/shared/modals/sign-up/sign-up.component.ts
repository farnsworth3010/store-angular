import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { ShopService } from '../../../core/services/shop.service';
import { SignUpResponse } from '../../../core/interfaces/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, Observable } from 'rxjs';
import { NzModalComponent, NzModalService } from 'ng-zorro-antd/modal';
import { agreementText } from '../../../core/constants/agreement';

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
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    checkPassword: FormControl<string>;
    phoneNumberPrefix: FormControl<'+86' | '+87'>;
    phoneNumber: FormControl<string>;
    agree: FormControl<boolean>;
    firstname: FormControl<string>;
  }>;
  submitForm(): Observable<number> {
    return new Observable<number>(subscriber => {
      if (this.validateForm.valid && this.validateForm.getRawValue().agree) {
        console.log('submit', this.validateForm.value);
        const { email, password, phoneNumber, firstname } =
          this.validateForm.getRawValue();
        this.shop
          .signUp({ email, password, phoneNumber, firstname })
          .pipe(takeUntilDestroyed(this.destroyRef), delay(1000))
          .subscribe((res: SignUpResponse) => {
            subscriber.next(res.id);
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
  agreement($event: Event): void {
    $event.stopPropagation();
    this.validateForm.controls.agree.setValue(
      !this.validateForm.getRawValue().agree
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
  constructor(
    private fb: NonNullableFormBuilder,
    private shop: ShopService,
    private destroyRef: DestroyRef,
    private modal: NzModalService
  ) {
    this.validateForm = this.fb.group({
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
      phoneNumberPrefix: '+86' as '+86' | '+87',
      phoneNumber: ['', [Validators.required]],
      agree: [false],
    });
  }
}
