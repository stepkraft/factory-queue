import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import {
  IState as IStoreState,
  getQueueObject,
  getFixpartsInfo,
  getDetailInWork,
} from '../../store/reducers';

import {
  AddToQueueAction,
  RemoveFromQueue,
  SetQueueAction,
} from '../../store/actions/queue';

import {
  AddDetailAction,
} from '../../store/actions/inWork';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.html',
})
export class AppComponent {
  public queue$: Observable<any[]>;
  public fixpartsInfo$: Observable<any[]>;
  public detailInWork$: Observable<any>;

  private _queue: any[];

  constructor(private store: Store<IStoreState>) {
    this.queue$ = store.select(getQueueObject);
    this.detailInWork$ = store.select(getDetailInWork);
    this.fixpartsInfo$ = store.select(getFixpartsInfo);

    this.queue$.subscribe((q) => { this._queue = q; });
  }

  public addToQueue = (payload) => {
    this.store.dispatch(new AddToQueueAction(payload));
  }

  public resetQueue = (payload) => {
    this.store.dispatch(new SetQueueAction(payload));
  }

  public addDetailToWork = () => {
    const firstDetailInQueue = this._queue[0] || false;
    if (firstDetailInQueue) {
      setTimeout(() => {
        this.store.dispatch(new RemoveFromQueue(firstDetailInQueue));
        this.store.dispatch(new AddDetailAction(firstDetailInQueue));
      }, 0);
    }
  }
}
