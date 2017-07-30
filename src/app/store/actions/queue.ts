import { Action } from '@ngrx/store';

export const QUEUE_SET = 'QUEUE_SET';
export const ADD_TO_QUEUE = 'ADD_TO_QUEUE';
export const REMOVE_FROM_QUEUE = 'REMOVE_FROM_QUEUE';
export const CLEAR_QUEUE = 'CLEAR_QUEUE';

export class SetQueueAction implements Action {
  public readonly type = QUEUE_SET;

  constructor(public payload: any[]) {}
}

export class AddToQueueAction implements Action {
  public readonly type = ADD_TO_QUEUE;

  constructor(public payload: any[]) {}
}

export class RemoveFromQueue implements Action {
  public readonly type = REMOVE_FROM_QUEUE;

  constructor(public payload: any) {}
}

export class ClearQueueReducerAction implements Action {
  public readonly type = CLEAR_QUEUE;
}

export type Actions
  = SetQueueAction
  | AddToQueueAction
  | RemoveFromQueue
  | ClearQueueReducerAction;
