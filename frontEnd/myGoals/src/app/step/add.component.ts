import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StepService } from './step.service';
import { IStep } from '../user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-add',
  template: `
  <h1>Add new step</h1>
  <form [formGroup]="form" (ngSubmit)="submit()" class="form" >
    <input
      placeholder="Title"
      formControlName="title"
      class="input is-normal m-2"
    />
    <input type="date" formControlName="deadline" class="input is-normal m-2" />
    <textarea
      placeholder="Description"
      formControlName="description"
      class="textarea is-normal m-2"
    ></textarea>
    <select class="input is-normal m-2" name="users" formControlName="status" ng-model="userSelect">
      <option value="">--Select status--</option>
      <option value="not-started">not-started</option>
      <option value="in-progress">in-progress</option>
      <option value="completed">completed</option>
    </select>
    <button type="submit" class="button is-fullwidth is-success m-2">
      Submit
    </button>
  </form>
  `,
})
export class AddComponent implements OnInit {

  goalId!: string

  form = inject(FormBuilder).nonNullable.group({
    title: ['', [Validators.required]],
    description: '',
    status: '',
    deadline: ''
  })
  step!: {
    title: any,
    description: any,
    status: any,
    deadline: any
  }

  constructor(private stepService: StepService, private activatedRoute: ActivatedRoute, private router: Router) {
      this.activatedRoute.params.subscribe(res => {
        const {goal_id} = res
        this.goalId = goal_id
      })
   }

   dateToTimestamp(strDate: string){
    const date1 = strDate.split('-').join('/'); //convert yyyy-mm-dd to yyyy/mm/dd. https://medium.com/ngconf/angular-date-parsing-gotchas-83e3b811eb0a
    let datum = Date.parse(date1);
    console.log(datum)
    return datum;
   }

   timestampToDate(strDate: number){
    return new Date(strDate).toLocaleDateString('en-US');
   }

  submit() { 
    const formdata = {
      title: this.form.get('title')!.value,
      deadline: this.dateToTimestamp(this.form.get('deadline')!.value),
      description: this.form.get('description')!.value,
      status: this.form.get('status')!.value
    };

    this.stepService.addStep(formdata, this.goalId).subscribe(response => {
      console.log(response)
    })
    this.router.navigate(['goals', 'step', this.goalId]);
  }

  ngOnInit(): void { }
}
