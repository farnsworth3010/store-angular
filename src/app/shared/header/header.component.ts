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
} from 'ng-zorro-antd/drawer';
import {
  RouterLink,
  RouterLinkActive,
  Router,
  NavigationStart,
} from '@angular/router';
import {
  NzModalComponent,
  NzModalContentDirective,
  NzModalFooterDirective,
} from 'ng-zorro-antd/modal';
import { SignInComponent } from '../modals/sign-in/sign-in.component';
import { NzFooterComponent } from 'ng-zorro-antd/layout';
import { SignUpComponent } from '../modals/sign-up/sign-up.component';
import { AuthService } from '../../core/services/auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay } from 'rxjs';
import { OnlyAdminsDirective } from '../../core/directives/only-admins.directive';
import { AsyncPipe } from '@angular/common';

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
    OnlyAdminsDirective,
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor(
    private changeDetector: ChangeDetectorRef,
    public authService: AuthService,
    private destroyRef: DestroyRef,
    private router: Router
  ) {}

  showDrawer = false;
  isModalVisible: boolean = false;
  showSignUp: boolean = true;
  showSignOut: boolean = false;
  isOkLoading: boolean = false;

  @Input({ required: true }) fixed: boolean = true;

  @ViewChild('signIn', { static: false }) signInForm!: SignInComponent;
  @ViewChild('signUp', { static: false }) signUpForm!: SignUpComponent;

  @HostBinding('class.fixed') get isFixed() {
    return this.fixed;
  }

  ngOnInit() {
    this.authService.authorized
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((authorized: boolean) => {
        this.showSignOut = authorized;
        this.changeDetector.markForCheck();
      });
    this.router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        if (['/home', '/'].includes(event.url)) {
          this.fixed = false;
          return;
        }
        this.fixed = true;
      }
    });
  }

  signOut(): void {
    this.authService.signOut();
    this.changeDetector.markForCheck();
  }

  toggleMenu(): void {
    this.showDrawer = !this.showDrawer;
  }

  toggleModal(): void {
    this.isModalVisible = !this.isModalVisible;
  }

  toggleRegistered(): void {
    this.showSignUp = !this.showSignUp;
    this.isOkLoading = false;
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
              this.authService.saveToken(
                token,
                !this.signInForm.validateForm.getRawValue().remember
              );
            } else {
              this.signInForm.validateForm.updateValueAndValidity();
            }
            this.isOkLoading = false;
            this.changeDetector.markForCheck();
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
}
