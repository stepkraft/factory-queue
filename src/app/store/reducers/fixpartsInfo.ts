export interface IState {
  fixparts: Array<{[key: string]: string|number }>;
}

const initialState: IState = {
  fixparts: [
    {
      id: 'scooter',
      text: 'Scooter Part',
      timeToProduce: 8000,
      image: './assets/img/motorbike.svg'
    },
    {
      id: 'moto',
      text: 'Motorcircle Part',
      timeToProduce: 10000,
      image: './assets/img/motor-sports.svg'
    },
    {
      id: 'bike',
      text: 'Bike Part',
      timeToProduce: 4000,
      image: './assets/img/bicycle.svg'
    },
  ],
};

export function reducer(state = initialState, action: any): IState {
  switch (action.type) {
    default:
      return state;
  }
}

export const getFixpartsInfo = (state: IState) => state.fixparts;
