import { call, put, takeLatest } from 'redux-saga/effects';
import { UserLockPrePhase, UserView, ViewParams } from '@core/api';
import { IViewParams } from '@app/shared/interface';
import { actions } from '.';

export function* loadParamsSaga(
  action: ReturnType<typeof actions.loadAppParams.request>,
): Generator {
  try {
    const params = (yield call(ViewParams, action.payload ? action.payload : null)) as IViewParams;
    yield put(actions.setAppParams(params));
  } catch (e) {
    yield put(actions.loadAppParams.failure(e));
  }
}
export function* loadUserView(
  action: ReturnType<typeof actions.loadUserView.request>,
): Generator {
  try {
    const params = (yield call(UserView, action.payload ? action.payload : null));
    console.log(params);
  } catch (e) {
    console.log(e);
    yield put(actions.loadUserView.failure(e));
  }
}
export function* addUserLockPrePhase(
  action: ReturnType<typeof actions.addUserPrePhase.request>,
): Generator {
  try {
    // @ts-ignore
    const params = (yield call(UserLockPrePhase, action.payload ? action.payload : null));
    console.log(params);
  } catch (e) {
    console.error(e);
    yield put(actions.addUserPrePhase.failure(e));
  }
}

function* mainSaga() {
  yield takeLatest(actions.loadAppParams.request, loadParamsSaga);
  yield takeLatest(actions.loadUserView.request, loadUserView);
  yield takeLatest(actions.addUserPrePhase.request, addUserLockPrePhase);
}

export default mainSaga;
