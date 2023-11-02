import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { GoalsService } from './goals.service';
import { map, mergeMap } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-update',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="form">
      <input
        placeholder="Title"
        formControlName="title"
        class="input is-normal m-2"
      />
      <input
        type="date"
        formControlName="deadline"
        class="input is-normal m-2"   
      />
      <textarea
        placeholder="Description"
        formControlName="description"
        class="textarea is-normal m-2"
      ></textarea>
      <button type="submit" class="button is-fullwidth is-success m-2">
        Submit
      </button>
    </form>
  `,
})
export class UpdategoalComponent {
  goalId!: string
  goal: any
  editedGoal: any
  form = inject(FormBuilder).nonNullable.group({
    _id: '',
    title: ['', [Validators.required]],
    description: '',
    deadline: ''
  });

  constructor(private router: Router,
    private goalService: GoalsService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.activatedRoute.paramMap
      .pipe(
        map(params => params.get('goal_id')),
        mergeMap(goal_id => this.goalService.getGoalById(goal_id as string))
      )
      .subscribe(response => {
        this.goal = response.data
        this.form.patchValue({
          _id: this.goal._id,
          title: this.goal.title,
          description: this.goal.description,
          deadline: formatDate(this.goal.deadline, 'yyyy-MM-dd', 'en-US')
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
      description: this.form.get('description')!.value
    };
    this.goalService.updateGoalById(formdata, this.form.get('_id')?.value as string)
      .subscribe(response => {
        console.log(response)
        this.router.navigate(['', 'goals', 'list'])
      })
  }
}
