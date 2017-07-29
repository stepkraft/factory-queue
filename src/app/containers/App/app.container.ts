import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import {
  IState as IStoreState,
  getQueueObject,
} from '../../store/reducers';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.html',
})
export class AppComponent {
  public queue$: Observable<any[]>;

  constructor(private store: Store<IStoreState>) {
    this.queue$ = store.select(getQueueObject);
  }
}
