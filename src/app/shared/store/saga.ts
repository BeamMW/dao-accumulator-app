import {
  call, take, fork, takeLatest, put, select,
} from 'redux-saga/effects';

import { eventChannel, END } from 'redux-saga';
import { actions } from '@app/shared/store/index';
import { actions as mainActions } from '@app/containers/Main/store/index';
import { navigate, setSystemState } from '@app/shared/store/actions';
import Utils from '@core/utils.js';
import { setUserView } from '@app/containers/Main/store/actions';
import store from '../../../index';

export function remoteEventChannel() {
  return eventChannel((emitter) => {
    Utils.initialize({
      appname: 'BEAM DAO-ACCUMULATOR',
      min_api_version: '6.2',
      headless: false,
      apiResultHandler: (error, result, full) => {
        console.log('api result data: ', result, full);
        console.log(result);
        if (!result.error) {
          emitter(full);
        }
      },
    }, (err) => {
      Utils.download('./dao-accumulator.wasm', (err, bytes) => {
        Utils.callApi('ev_subunsub', { ev_txs_changed: true, ev_system_state: true },
          (error, result, full) => {
            if (result) {
              store.dispatch(mainActions.loadAppParams.request(bytes));
              store.dispatch(mainActions.loadUserView.request(null));
            }
          });
      });
    });

    const unsubscribe = () => {
      emitter(END);
    };

    return unsubscribe;
  });
}

function* sharedSaga() {
  const remoteChannel = yield call(remoteEventChannel);

  while (true) {
    try {
      const payload: any = yield take(remoteChannel);
      switch (payload.id) {
        case 'ev_system_state':
          store.dispatch(setSystemState(payload.result));
          store.dispatch(mainActions.loadAppParams.request(null));
          store.dispatch(mainActions.loadUserView.request(null));
          break;
        default:
          break;
      }
    } catch (err) {
      remoteChannel.close();
    }
  }
}

export default sharedSaga;
