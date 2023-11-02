import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IGoal } from '../state.interface';


@Injectable({
  providedIn: 'root'
})
export class StateService {

  state: BehaviorSubject<IGoal> = new BehaviorSubject<IGoal>({
    goalId: '',
    title: '',
    description: ''
  })

  constructor() { }
}
