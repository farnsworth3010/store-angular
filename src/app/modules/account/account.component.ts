import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NzHeaderComponent } from 'ng-zorro-antd/layout';
import { HeaderComponent } from '../../shared/header/header.component';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/interfaces/user';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import {
  NzModalComponent,
  NzModalContentDirective,
  NzModalFooterDirective,
} from 'ng-zorro-antd/modal';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    NzHeaderComponent,
    HeaderComponent,
    NzButtonComponent,
    NzCardComponent,
    NzAvatarComponent,
    NzDividerComponent,
    NzModalComponent,
    NzModalContentDirective,
    NzModalFooterDirective,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private changeDetector: ChangeDetectorRef
  ) {}
  userInfo: User | null = null;
  isDeleteModalVisible: boolean = false;
  ngOnInit() {
    this.userService.getUserInfo().subscribe((res: User) => {
      this.userInfo = res;
      this.changeDetector.markForCheck();
    });
  }
  signOut() {
    this.authService.signOut();
  }
  toggleDeleteAccountModal(): void {
    this.isDeleteModalVisible = !this.isDeleteModalVisible;
  }
  handleDeleteCancel(): void {
    this.isDeleteModalVisible = false;
  }
  deleteAccount(): void {}
}
