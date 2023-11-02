import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IStep } from '../state.interface';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  state: BehaviorSubject<IStep> = new BehaviorSubject<IStep>({
    id: '',
    title: '',
    description: ''
  })
  constructor() { }
}
