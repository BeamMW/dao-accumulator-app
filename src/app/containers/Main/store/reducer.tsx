import produce from 'immer';
import { ActionType, createReducer } from 'typesafe-actions';
import { IDAOAccum, IUserView, IViewParams } from '@app/shared/interface';
import * as actions from './actions';

type Action = ActionType<typeof actions>;

const initialState: IDAOAccum = {
  params: [],
  balance: [],
};

const reducer = createReducer<any, Action>(initialState)
  .handleAction(actions.setAppParams, (state, action) => produce(state, (nexState) => {
    nexState.params = action.payload;
  }))
  .handleAction(actions.setUserView, (state, action) => produce(state, (nexState) => {
    nexState.balance = action.payload;
  }));

export { reducer as MainReducer };
