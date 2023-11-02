import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IGoal, IStep } from '../user.interface';
import { StepService } from './step.service';
import { GoalsService } from '../goals/goals.service';
import { map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-list',
  template: ` 
  <h1>STEP LIST</h1>
    <button class="button is-fullwidth is-success" (click)="add()">
      ADD NEW STEP
    </button>
    <app-step *ngFor="let step of steps" [step]="step" [goalId]="goalId"></app-step>
    `,
})
export class ListComponent implements OnInit {

  @Input() goal!: IGoal
  steps: IStep[] = []
  goalId!: string

  constructor(private route: Router,
    private stepService: StepService,
    private goalService: GoalsService,
    private activatedRoute: ActivatedRoute) {

    this.activatedRoute.paramMap
      .pipe(
        map(params => params.get('goal_id')),
        mergeMap(goal_id => this.stepService.getSteps(goal_id as string))
      )
      .subscribe(response => {
        this.steps = response.data
      })
      this.activatedRoute.params.subscribe(res => {
        const {goal_id} = res
        this.goalId = goal_id
      })
  }
  add() {
    this.route.navigate(['goals', 'step', 'add', this.goalId ])
  }

  ngOnInit(): void {
  }
}
