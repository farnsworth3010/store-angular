import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import {
  NzDrawerComponent,
  NzDrawerContentDirective,
  NzDrawerPlacement,
} from 'ng-zorro-antd/drawer';
import { NavLink } from '../../core/interfaces/navLink';
import { NavLinks } from '../../core/constants/navLinks';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  NzModalComponent,
  NzModalContentDirective,
  NzModalFooterDirective,
} from 'ng-zorro-antd/modal';
import { SignInComponent } from '../modals/login/sign-in.component';
import { NzFooterComponent } from 'ng-zorro-antd/layout';
import { SignUpComponent } from '../modals/sign-up/sign-up.component';
import { AuthService } from '../../core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzIconDirective,
    NzDrawerComponent,
    NzDrawerContentDirective,
    RouterLink,
    RouterLinkActive,
    NzModalComponent,
    NzModalContentDirective,
    SignInComponent,
    NzFooterComponent,
    NzModalFooterDirective,
    SignUpComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  visible = false;
  placement: NzDrawerPlacement = 'left';
  links: NavLink[] = NavLinks;
  isModalVisible: boolean = false;
  showSignUp: boolean = true;
  showSignOut: boolean = false;
  isOkLoading: boolean = false;
  constructor(
    private changeDetector: ChangeDetectorRef,
    public authService: AuthService,
    private destroyRef: DestroyRef
  ) {}
  @Input({ required: true }) fixed: boolean = true;
  @HostBinding('class.fixed') get isFixed() {
    return this.fixed;
  }
  @ViewChild('signIn', { static: false }) signInForm!: SignInComponent;
  @ViewChild('signUp', { static: false }) signUpForm!: SignUpComponent;
  ngOnInit() {
    this.authService.authorized
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((authorized: boolean) => {
        this.showSignOut = authorized;
        this.changeDetector.markForCheck();
      });
  }
  signOut(): void {
    this.authService.signOut();
    this.changeDetector.markForCheck();
  }

  open(): void {
    this.visible = true;
  }

  showModal(): void {
    this.isModalVisible = !this.isModalVisible;
  }
  toggleRegistered(): void {
    this.showSignUp = !this.showSignUp;
    this.changeDetector.markForCheck();
  }
  handeCancel(): void {
    this.isModalVisible = false;
  }
  handleOk(): void {
    this.isOkLoading = true;
    this.changeDetector.markForCheck();
    if (this.showSignUp) {
      this.signInForm
        .submitForm()
        .pipe(delay(500))
        .subscribe({
          next: (token: string) => {
            if (token) {
              this.isModalVisible = false;
              this.isOkLoading = false;
              this.authService.saveToken(token);
              this.changeDetector.markForCheck();
            }
          },
          error: () => {
            this.isOkLoading = false;
            this.changeDetector.markForCheck();
          },
        });
    } else {
      this.signUpForm.submitForm().subscribe({
        next: (id: number) => {
          if (id) {
            this.showSignUp = true;
          }
          this.isOkLoading = false;
          this.changeDetector.markForCheck();
        },
        error: () => {
          this.isOkLoading = false;
          this.changeDetector.markForCheck();
        },
      });
    }
  }
  handleCancel(): void {
    this.isModalVisible = false;
  }
  close(): void {
    this.visible = false;
  }
}
