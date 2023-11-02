import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { StepService } from '../step/step.service';
import { IGoal } from '../user.interface';
import { GoalsComponent } from './goals.component';
import { GoalsService } from './goals.service';
import { StateService } from './state.service';


@Component({
  selector: 'app-goal',
  template: `
<div class="card">
      <header class="card-header">
        <p class="card-header-title">{{goal.title}}</p>
      </header>
      <div class="card-content">
        <div class="content">
          <p>Description: {{goal.description}}</p>
          <p>Deadline: {{goal.deadline | date: 'dd/MM/yyyy'}}</p>
          <strong>Progress: {{percent| number : '1.0-0' }}%</strong>
          <progress class="progress is-success" value="{{percent}}" max="100">{{percent}}%</progress>
        </div>
      </div>
      <footer class="card-footer">
        <button (click)="steps(goal._id)" class="button is-fullwidth is-success m-2">
          Steps
        </button>
        <button (click)="edit(goal._id)" class="button is-fullwidth is-success m-2">
          Edit
        </button>
        <button (click)="delete(goal._id)" class="button is-fullwidth is-success m-2">
          Delete
        </button>
      </footer>
    </div>
  `,
  styles: [
  ]
})
export class GoalComponent implements OnInit {
  @Input() goal!: IGoal
  goalId!: string
  percent!: number
  constructor(private router: Router,
    private goalService: GoalsService,
    private stepService: StepService,
    private goalArray: GoalsComponent) {
  }

  edit(goalId: string) {
    this.router.navigate(['goals', 'update', goalId]);
  }
  steps(goalId: string) {
    this.router.navigate(['goals', 'step', goalId]);
  }
  delete(goalId: string) {
    this.goalService.deleteGoalById(goalId)
      .subscribe(response => {
        console.log("delete successfull")
        this.goalArray.goals = this.goalArray.goals.filter(g => g._id !== goalId)
      })
  }

  ngOnInit(): void {
    this.goalService.percentageComplete(this.goal._id).subscribe(response => {
      this.percent = +response
    })
  }

}
