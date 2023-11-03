import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IStep } from '../user.interface';
import { ListComponent } from './list.component';
import { StepService } from './step.service';

@Component({
  selector: 'app-step',
  template: `
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">{{step.title}}</p>
      </header>
      <div class="card-content">
        <div class="content">
          <p>Description: {{step.description}}</p>
          <p>Deadline: {{step.deadline | date}}</p>
          <p>Status: {{step.status}}</p>
        </div>
      </div>
      <footer class="card-footer">
        <button (click)="edit()" class="button is-fullwidth is-success m-2">
          Edit
        </button>
        <button (click)="delete(goalId, step._id)" class="button is-fullwidth is-success m-2">
          Delete
        </button>
      </footer>
    </div>
  `,
  styles: [
  ]
})
export class StepComponent implements OnInit {

  @Input() step!: IStep
  @Input() goalId!: string

  constructor(private router: Router, private stepService: StepService, private stepsArray: ListComponent) { }

  edit() {
    this.router.navigate(['goals', 'step', 'update', this.goalId, this.step._id ])
  }

  delete(gId: string, sId: string) {
    this.stepService.deleteStepById(gId, sId).subscribe(response => {
      this.stepsArray.steps = this.stepsArray.steps.filter(s => s._id !== sId)
    })
  }

  ngOnInit(): void {
  }

}
