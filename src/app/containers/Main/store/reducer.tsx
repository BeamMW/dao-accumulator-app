import produce from 'immer';
import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';

type Action = ActionType<typeof actions>;

const initialState = {
  params: [],
};

const reducer = createReducer<any, Action>(initialState)
  .handleAction(actions.setAppParams, (state, action) => produce(state, (nexState) => {
    nexState.params = action.payload;
  }));

export { reducer as MainReducer };
