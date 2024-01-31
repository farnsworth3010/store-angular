import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzHeaderComponent } from 'ng-zorro-antd/layout';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [NzHeaderComponent, HeaderComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {}
