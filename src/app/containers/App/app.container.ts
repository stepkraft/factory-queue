import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import {
  IState as IStoreState,
  getQueueObject,
  getFixpartsInfo,
} from '../../store/reducers';

import {
  AddToQueueAction,
  SetQueueAction,
} from '../../store/actions/queue';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.html',
})
export class AppComponent {
  public queue$: Observable<any[]>;
  public fixpartsInfo$: Observable<any[]>;

  constructor(private store: Store<IStoreState>) {
    this.queue$ = store.select(getQueueObject);
    this.fixpartsInfo$ = store.select(getFixpartsInfo);

    this.queue$.subscribe((v) => {
      console.log('this.queue$ changed to ', v);
    })
  }

  public addToQueue = (payload) => {
    this.store.dispatch(new AddToQueueAction(payload));
  }

  public resetQueue = (payload) => {
    this.store.dispatch(new SetQueueAction(payload));
  }
}
