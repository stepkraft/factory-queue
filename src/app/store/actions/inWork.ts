import { Action } from '@ngrx/store';

export const ADD_DETAIL = 'ADD_DETAIL';
export const REMOVE_DETAIL = 'REMOVE_DETAIL';

export class AddDetailAction implements Action {
  public readonly type = ADD_DETAIL;

  constructor(public payload: any) {}
}

export class RemoveDetailAction implements Action {
  public readonly type = REMOVE_DETAIL;
}

export type Actions
  = AddDetailAction
  | RemoveDetailAction;
