import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { OnlyAdminsDirective } from '../../core/directives/only-admins.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe, OnlyAdminsDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(public auth: AuthService) {}
  gg() {
    console.log(window);
  }
}
