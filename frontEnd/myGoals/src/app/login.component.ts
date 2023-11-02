import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import jwt_decode from 'jwt-decode';
import { StateService } from './state.service';


@Component({
  selector: 'app-login',
  template: ` <form [formGroup]="form" (ngSubmit)="submit()" class="form">
    <input
      placeholder="email"
      formControlName="email"
      class="input is-normal m-2"
    />

    <input
      placeholder="password"
      formControlName="password"
      class="input is-normal m-2"
      type="password"
    />

    <button type="submit" class="button is-fullwidth is-success m-2">
      LOGIN
    </button>
  </form>`,
})
export class LoginComponent {
  form = inject(FormBuilder).nonNullable.group({
    email: ['tam@gmail.com', Validators.required],
    password: ['123', Validators.required],
  });
  constructor(private userService: UserService, private router: Router, private stateService: StateService) {}

  submit() {
    this.userService.login(this.form.value as {email: string, password: string})
    .subscribe(response => {
      if (response.success) {
        //save the state + persist in localStorage
        const decoded = jwt_decode(response.data) as {_doc: {fullname: string, email: string}};
        console.log(decoded)
        const state = {
          email: decoded._doc.email,
          fullname: decoded._doc.email,
          token: response.data
        }
        this.stateService.state.next(state)
        localStorage.setItem('STATE', JSON.stringify(state))
        this.router.navigate(['', 'goals', 'list'])
      }
    })
  }
}
