import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoalsService } from './goals.service';
import { StepService } from '../step/step.service';
import { IGoal } from '../user.interface';

@Component({
  selector: 'app-add',
  template: ` 
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
    <button type="submit" class="button is-fullwidth is-success m-2">
      Submit
    </button>
  </form>`,
})
export class AddgoalComponent implements OnInit {
  private router = inject(Router);
  addObj!: {
    title: '',
    description: '',
    deadline: 0
  }

  constructor(private goalService: GoalsService) { }

  form = inject(FormBuilder).nonNullable.group({
    title: ['', [Validators.required]],
    description: '',
    deadline: ''
  });

  ngOnInit(): void {
  }

  dateToNumber(d: Date) {
    let stringDate = d.toLocaleDateString('en-US')
    return Date.parse(stringDate);
  }

  dateToTimestamp(strDate: string) {
    const date1 = strDate.split('-').join('/'); //convert yyyy-mm-dd to yyyy/mm/dd. https://medium.com/ngconf/angular-date-parsing-gotchas-83e3b811eb0a
    let datum = Date.parse(date1);
    console.log(datum)
    return datum;
  }

  timestampToDate(strDate: number) {
    return new Date(strDate).toLocaleDateString('en-US');
  }
  submit() {
    const formdata = {
      title: this.form.get('title')!.value,
      deadline: this.dateToTimestamp(this.form.get('deadline')!.value),
      description: this.form.get('description')!.value
    };

    this.goalService.addGoal(formdata)
      .subscribe(response => {
        this.router.navigate(['', 'goals', 'list'])
      })

  }
}
