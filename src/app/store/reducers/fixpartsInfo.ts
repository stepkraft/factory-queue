export interface IState {
  fixparts: Array<{[key: string]: string|number }>;
}

const initialState: IState = {
  fixparts: [
    { id: 'scooter', text: 'Scooter Part', timeToProduce: 3000 },
    { id: 'moto', text: 'Motorcircle Part', timeToProduce: 8000 },
    { id: 'bike', text: 'Bike Part', timeToProduce: 1000 },
  ],
};

export function reducer(state = initialState, action: any): IState {
  switch (action.type) {
    default:
      return state;
  }
}

export const getFixpartsInfo = (state: IState) => state.fixparts;
