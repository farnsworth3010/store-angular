import { ChangeDetectorRef, Directive } from '@angular/core';
import { UserService } from '../services/user.service';

@Directive({
  selector: '[appOnlyAdmins]',
  exportAs: 'access',
  standalone: true,
})
export class OnlyAdminsDirective {
  constructor(
    public user: UserService,
    private changeDetector: ChangeDetectorRef
  ) {
    user.userInfo.subscribe(() => {
      this.changeDetector.markForCheck();
    });
  }
}
