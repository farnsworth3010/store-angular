import { ChangeDetectorRef, Directive } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Directive({
  selector: '[appOnlyAdmins]',
  exportAs: 'access',
  standalone: true,
})
export class OnlyAdminsDirective {
  constructor(
    public auth: AuthService,
    private changeDetector: ChangeDetectorRef
  ) {
    auth.userInfo.subscribe(() => {
      this.changeDetector.markForCheck();
    });
  }
}
