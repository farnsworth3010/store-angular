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

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [NzHeaderComponent, HeaderComponent, NzButtonComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private changeDetector: ChangeDetectorRef
  ) {}
  userInfo: User | null = null;
  ngOnInit() {
    this.authService.getUserInfo().subscribe((res: User) => {
      this.userInfo = res;
      this.changeDetector.markForCheck();
    });
  }
  signOut() {
    this.authService.signOut();
  }
}
