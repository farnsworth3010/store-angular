import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { Admin, AdminResponse } from '../../../core/interfaces/user';
import { PanelService } from '../../../core/services/panel.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { UserService } from '../../../core/services/user.service';
import { delay } from 'rxjs';
@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [
    NzListModule,
    NzIconDirective,
    NzPaginationComponent,
    NzInputGroupComponent,
    ReactiveFormsModule,
    NzTabsModule,
    CurrencyPipe,
    NzTableModule,
    NzToolTipModule,
    NzPopconfirmModule,
  ],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminsComponent implements OnInit {
  constructor(
    private panel: PanelService,
    private destroyRef: DestroyRef,
    private changeDetector: ChangeDetectorRef,
    public userInfo: UserService
  ) {}
  page: number = 0;
  pageSize: number = 50;
  total: number = 0;
  data: Admin[] | null = null;
  fetching: boolean = true;
  ngOnInit(): void {
    this.panel
      .getAdmins()
      .pipe(delay(500), takeUntilDestroyed(this.destroyRef))
      .subscribe((res: AdminResponse) => {
        this.fetching = false;
        this.data = res.data;
        this.changeDetector.markForCheck();
      });
  }
  setRole(ID: number, RoleID: number): void {
    this.panel
      .setRole({ id: ID, role_id: RoleID })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        // fix this!!!
        const user = this.data?.find(el => el.ID === ID);
        user!.role_id = RoleID;
        this.data = this.data?.filter(el => el.ID !== ID) ?? [];
        this.data.push(user!); // fix this mutation
        this.changeDetector.markForCheck();
      });
  }
}
