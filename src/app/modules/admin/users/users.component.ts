import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { ShortUser, UsersResponse } from '../../../core/interfaces/user';
import { PanelService } from '../../../core/services/panel.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NzTableModule, NzIconModule, NzToolTipModule, NzPopconfirmModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  constructor(
    private panel: PanelService,
    private destroyRef: DestroyRef,
    private changeDetector: ChangeDetectorRef,
    public userInfo: UserService
  ) {}
  page: number = 0;
  pageSize: number = 50;
  total: number = 0;
  data: ShortUser[] | null = null;
  fetching: boolean = true;
  ngOnInit(): void {
    this.panel
      .getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: UsersResponse) => {
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
