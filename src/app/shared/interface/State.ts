import {IDAOAccum, SharedStateType} from '@app/shared/interface/SharedStateType';

export interface AppState {
  shared: SharedStateType;
  main: IDAOAccum ;
}
