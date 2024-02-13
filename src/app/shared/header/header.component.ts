import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  visible = false;
  placement: NzDrawerPlacement = 'left';
  links: NavLink[] = NavLinks;

  @Input({ required: true }) fixed: boolean = true;
  @HostBinding('class.fixed') get isFixed() {
    return this.fixed;
  }
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
