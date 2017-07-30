import {
  Actions,
  ADD_TO_QUEUE,
  REMOVE_FROM_QUEUE,
  QUEUE_SET,
  CLEAR_QUEUE,
} from '../actions/queue';

export interface IState {
  queue: any[];
}

const initialState: IState = {
  queue: [],
};

export function reducer(state = initialState, action: Actions): IState {
  switch (action.type) {
    case ADD_TO_QUEUE: {
      return {
        ...state,
        queue: [].concat(state.queue, action.payload)
      };
    }

    case REMOVE_FROM_QUEUE: {
      return {
        ...state,
        queue: state.queue.filter((part) => (part !== action.payload)),
      };
    }

    case QUEUE_SET: {
      return {
        ...state,
        queue: [...action.payload],
      };
    }

    case CLEAR_QUEUE: {
      return {
        ...state,
        queue: [],
      };
    }

    default:
      return state;
  }
}

export const getQueue = (state: IState) => state.queue;
