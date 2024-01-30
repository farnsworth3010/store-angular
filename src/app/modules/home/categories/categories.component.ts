import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NzButtonComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {}
