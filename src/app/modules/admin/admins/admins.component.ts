import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { User } from '../../../core/interfaces/user';

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
  ],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminsComponent {
  data: User[] | null = null;
}
