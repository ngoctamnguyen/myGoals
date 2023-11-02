import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add.component';
import { UpdateComponent } from './update.component';
import { ListComponent } from './list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StepComponent } from './step.component';

@NgModule({
  declarations: [AddComponent, UpdateComponent, ListComponent, StepComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: ':goal_id', component: ListComponent },
      { path: 'add/:goal_id', component: AddComponent },
      { path: 'update/:goal_id/:step_id', component: UpdateComponent },
    ]),
  ],
})
export class StepModule {}
