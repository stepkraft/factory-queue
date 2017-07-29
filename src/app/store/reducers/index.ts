import { compose } from '@ngrx/core/compose';
import { createSelector } from 'reselect';
import { ActionReducer, combineReducers } from '@ngrx/store';
import * as fromQueue from './queue';
import * as fromFixpartsInfo from './fixpartsInfo';

export interface IState {
  queue: fromQueue.IState;
  fixparts: fromFixpartsInfo.IState;
}

const reducers = {
  queue: fromQueue.reducer,
  fixparts: fromFixpartsInfo.reducer,
};

export function reducer(state: any, action: any): ActionReducer<IState> {
  return combineReducers(reducers)(state, action);
}

export const getQueueState = (state: IState) => state.queue;
export const getQueueObject = createSelector(getQueueState, fromQueue.getQueue);

export const getFixpartsInfo = (state: IState) => state.fixparts.fixparts;
