import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { NzHeaderComponent } from 'ng-zorro-antd/layout';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import { NzInputGroupComponent } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { RouterLink } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AdminsComponent } from './admins/admins.component';
import { UsersComponent } from './users/users.component';
import { BlogComponent } from './blog/blog.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    NzHeaderComponent,
    NzCardComponent,
    NzListModule,
    NzIconDirective,
    NzPaginationComponent,
    NzInputGroupComponent,
    ReactiveFormsModule,
    NzTabsModule,
    RouterLink,
    ProductsComponent,
    AdminsComponent,
    UsersComponent,
    BlogComponent,
  ],
})
export class PanelComponent {}
