import { Action } from '@ngrx/store';

export const QUEUE_SET = 'QUEUE_SET';
export const CLEAR_QUEUE = 'CLEAR_QUEUE';

export class SetQueueAction implements Action {
  public readonly type = QUEUE_SET;

  constructor(public payload: any[]) {}
}

export class ClearQueueReducerAction implements Action {
  public readonly type = CLEAR_QUEUE;
}

export type Actions
  = SetQueueAction
  | ClearQueueReducerAction;
