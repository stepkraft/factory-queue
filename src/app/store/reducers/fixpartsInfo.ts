export interface IState {
  fixparts: Array<{[key: string]: string|number }>;
}

const initialState: IState = {
  fixparts: [
    { id: 'scooter', text: 'Scooter Part', timeToProduce: 8000 },
    { id: 'moto', text: 'Motorcircle Part', timeToProduce: 10000 },
    { id: 'bike', text: 'Bike Part', timeToProduce: 4000 },
  ],
};

export function reducer(state = initialState, action: any): IState {
  switch (action.type) {
    default:
      return state;
  }
}

export const getFixpartsInfo = (state: IState) => state.fixparts;
