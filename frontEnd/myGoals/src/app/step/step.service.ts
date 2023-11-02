import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IStep } from '../user.interface';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  private http = inject(HttpClient);

  getSteps(goal_id: string) {
    return this.http.get<{ data: IStep[] }>(
      `http://localhost:3000/goals/goal/` + goal_id + `/steps`
    );
  }
  getStepById(stepId: string, goalId: string) {
    return this.http.get<{ data: any }>(environment.server + '/goals/goal/' + goalId + '/steps/' + stepId);
  }
  
  addStep(step: any, goalId: string) {
    return this.http.post<IStep>(environment.server + '/goals/goal/' + goalId + '/steps', step);
  }

  updateStepById(step: any, goalId: string, stepId: string) {
    return this.http.patch<IStep>(environment.server + '/goals/goal/' + goalId + '/steps/' + stepId, step);
  }
  deleteStepById(goalId: string, stepId: string) {
    return this.http.delete(environment.server + '/goals/goal/' + goalId + '/steps/' + stepId);
  }
}
