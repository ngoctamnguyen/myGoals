import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IState } from './state.interface';
import { StateService } from './state.service';


@Component({
  selector: 'app-root',
  template: `<nav class="navbar is-transparent">
      <div
        id="navbarExampleTransparentExample "
        class="navbar-menu has-background-link-light"
      >
        <div class="navbar-start ">
          <a class="navbar-item has-text-link-dark" [routerLink]="['']">
            Home
          </a>
          <!-- *ngIf="state.token" -->
          <a
            class="navbar-item has-text-link-dark"
            [routerLink]="['goals', 'list']"
            *ngIf="state.token"
          >
            Goals
          </a>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped" >
              <div class="control" *ngIf="!state.token; else logoutButton">
                <button class="button is-primary mr-2" (click)="login()">Login</button>
                <button class="button is-primary" (click)="signup()"> Signup</button>
              </div>
              <ng-template #logoutButton>
                <button class="button is-primary" (click)="logout()"> Logout</button>
              </ng-template>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <section class="hero has-background-primary-light">
      <div class="hero-body">
        <p class="title has-text-info">Manage Your Goals, Lead to Success</p>
      </div>
    </section>

    <div class="container">
      <div class="notification is-primary is-success is-light">
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <figure class="image is-50x100">
          <img class="imagebox"
            src="https://admin.cs.miu.edu/portal/resources/img/appformbanner.png"
          />
          <p>
            <strong>MIU ©</strong> All rights reserved
          </p>
        </figure>
      </div>
    </footer>`,
    styles: [`
      .imagebox { width: 200px; height: 100px}
    `]
})
export class AppComponent {
  state!: IState
  private router = inject(Router);
  constructor(private stateService: StateService) {
    this.stateService.state.subscribe((state: IState) => {
      this.state = state
    })
  }
  login() {
    this.router.navigate(['', 'login']);
  }
  signup() {
    this.router.navigate(['', 'signup']);
  }
  logout() {
    this.stateService.state.next({
      email: '',
      fullname: '',
      token: ''
    })
    localStorage.clear()
    this.router.navigate(['','/'])
  }
}
