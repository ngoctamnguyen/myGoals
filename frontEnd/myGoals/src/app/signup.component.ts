import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from './user.interface';
import { UserService } from './user.service';

@Component({
  selector: 'app-signup',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="form">
      <input
        placeholder="email"
        formControlName="email"
        class="input is-normal m-2"
      />
      <input
        placeholder="fullname"
        formControlName="fullname"
        class="input is-normal m-2"
      />
      <input
        placeholder="password"
        formControlName="password"
        class="input is-normal m-2"
        type="password"
      />

      <button type="submit" class="button is-fullwidth is-success m-2">
        Submit
      </button>
    </form>
  `,
})
export class SignupComponent {
  form = inject(FormBuilder).nonNullable.group({
    email: ['tam@gmail.com', Validators.required],
    fullname: ['Tam Nguyen', Validators.required],
    password: ['12345', Validators.required],
  });
  // private route = inject(Router);
  constructor(private userService: UserService, private route: Router) {}

  submit() {
    console.log('test submit mit mit', this.form.value)
    const formData = new FormData();
    formData.append('email', this.form.get('email')!.value);
    formData.append('fullname', this.form.get('fullname')!.value);
    formData.append('password', this.form.get('password')!.value);
    console.log(formData)
    this.userService.signup(this.form.value as IUser).subscribe((response) => {
      this.form.reset();
      this.route.navigate(['', 'login']);
    });
  }
}
