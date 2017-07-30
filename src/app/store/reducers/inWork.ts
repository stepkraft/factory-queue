import {
  Actions,
  ADD_DETAIL,
  REMOVE_DETAIL,
} from '../actions/inWork';

export interface IState {
  detailInWork: any;
}

const initialState: IState = {
  detailInWork: null,
};

export function reducer(state = initialState, action: any): IState {
  switch (action.type) {
    case ADD_DETAIL: {
      return {
        ...state,
        detailInWork: {
          ...action.payload,
        }
      };
    }
    case REMOVE_DETAIL: {
      return {
        ...state,
        detailInWork: null,
      };
    }
    default:
      return state;
  }
}

export const getDetailInWork = (state: IState) => state.detailInWork;
