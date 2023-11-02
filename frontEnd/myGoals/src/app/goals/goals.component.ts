import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGoal } from '../user.interface';
import { GoalsService } from './goals.service';

@Component({
  selector: 'app-goals',
  template: ` 
    <button class="button is-fullwidth is-success" (click)="add()">
      ADD NEW GOAL
    </button>
    <app-goal *ngFor="let goal of goals" [goal]="goal"></app-goal>
    `,
})
export class GoalsComponent implements OnInit {

  goals: IGoal[] = []

  constructor(private router: Router, private goalService: GoalsService) {
    this.goalService.getGoals().subscribe(response => {
      this.goals = response.data
    })
  }

  add() {
    this.router.navigate(['goals', 'add']);
  }

  ngOnInit(): void {}
}
