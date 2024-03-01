import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { delay } from 'rxjs';
import { ShortUser } from '../../../core/interfaces/user';
import { PanelService } from '../../../core/services/panel/panel.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ApiResponse } from '../../../core/interfaces/response';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NzTableModule,
    NzIconModule,
    NzToolTipModule,
    NzPopconfirmModule,
    NzSkeletonModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  constructor(
    private panel: PanelService,
    private destroyRef: DestroyRef,
    private changeDetector: ChangeDetectorRef,
    public auth: AuthService
  ) {}
  page: number = 0;
  pageSize: number = 50;
  total: number = 0;
  data: ShortUser[] | null = null;
  fetching: boolean = true;
  ngOnInit(): void {
    this.panel
      .getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef), delay(500))
      .subscribe((res: ApiResponse<ShortUser>) => {
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
