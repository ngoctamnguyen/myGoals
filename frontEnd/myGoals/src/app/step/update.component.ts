import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StepService } from './step.service';
import { IStep } from '../user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common'

@Component({
  selector: 'app-update',
  template: `
  <h1>EDIT STEP<h1>
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
export class UpdateComponent implements OnInit {
  
  goalId!: string
  stepId!: string

  form = inject(FormBuilder).nonNullable.group({
    _id: '',
    title: ['', [Validators.required]],
    description: '',
    status: '',
    deadline: ''
  })

  constructor(private stepService: StepService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(res => {
      const {goal_id, step_id} = res
      this.goalId = goal_id
      this.stepId = step_id
      this.stepService.getStepById(step_id, goal_id).subscribe(response => {
        const step_item = response.data
        this.form.patchValue({
          _id: step_item._id,
          title: step_item.title,
          description: step_item.description,
          deadline: formatDate(step_item.deadline, 'yyyy-MM-dd', 'en-US'),
          status: step_item.status
        })

      })
    })
 }

 dateToTimestamp(strDate: string) {
  const datum = Date.parse(formatDate(strDate, 'yyyy-MM-dd', 'en-US'));
  return datum;
}
 
 submit() {
  const formdata = {
    title: this.form.get('title')!.value,
    deadline: this.dateToTimestamp(this.form.get('deadline')!.value),
    description: this.form.get('description')!.value,
    status: this.form.get('status')!.value
  };

  this.stepService.updateStepById(formdata, this.goalId, this.stepId)
  .subscribe(response => {
    this.router.navigate(['goals', 'step', this.goalId]);
  })

 }

  ngOnInit(): void {}
}
