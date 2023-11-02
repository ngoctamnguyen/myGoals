import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IGoal, IStep } from '../user.interface';

@Injectable({
  providedIn: 'root',
})
export class GoalsService {
  private http = inject(HttpClient);

  getGoals() {
    return this.http.get<{ data: IGoal[] }>(environment.server + '/goals');
  }
  getGoalById(goal_id: string) {
    return this.http.get<{ data: IGoal }>(
      environment.server + '/goals/' + goal_id
    );
  }
  addGoal(goal: any) {
    return this.http.post<IGoal>(environment.server + '/goals', goal);
  }
  updateGoalById(goal: any, goal_id: string) {
    return this.http.patch<IGoal>(
      environment.server + '/goals/' + goal_id,
      goal
    );
  }
  deleteGoalById(goal_id: string) {
    return this.http.delete(environment.server + '/goals/' + goal_id);
  }

  percentageComplete(goal_id: string) {
    return this.http.get(environment.server + '/goals/percent/' +  goal_id);
  }
}
