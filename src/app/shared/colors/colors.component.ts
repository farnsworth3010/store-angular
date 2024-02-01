import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [],
  templateUrl: './colors.component.html',
  styleUrl: './colors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsComponent {
  @Input({ required: true }) colors!: string[];
}
