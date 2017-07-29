import { compose } from '@ngrx/core/compose';
import { createSelector } from 'reselect';
import { ActionReducer, combineReducers } from '@ngrx/store';
import * as fromQueue from './queue';

export interface IState {
  queue: fromQueue.IState;
}

const reducers = {
  queue: fromQueue.reducer,
};

export function reducer(state: any, action: any): ActionReducer<IState> {
  return combineReducers(reducers)(state, action);
}

export const getQueueState = (state: IState) => state.queue;
export const getQueueObject = createSelector(getQueueState, fromQueue.getQueue);
