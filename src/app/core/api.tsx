import Utils from '@core/utils.js';
import { IUserViewPrePhase } from '@app/shared/interface/Request';

const dappnet = '0a20bfecffab04a8c49614c5054c043e80c09b4cbfe215182b97597b03e70694';
const CID = dappnet;

export function onMakeTx(err, sres, full, params: { id: number, vote: number } = null, toasted: string = null) {
  if (err) {
    console.log(err, 'Failed to generate transaction request');
  }
  return new Promise((resolve) => {
    Utils.callApi('process_invoke_data', { data: full.result.raw_data }, (error, result) => {
      resolve(result);
    });
  });
}
export function ViewParams<T = any>(payload): Promise<T> {
  return new Promise((resolve, reject) => {
    Utils.invokeContract(`action=view_params, cid=${CID}`,
      (error, result, full) => {
        if (!error) {
          resolve(result.res);
        } else {
          reject(error.error);
        }
      }, payload || null);
  });
}

export function UserView<T = any>(payload): Promise<T> {
  return new Promise((resolve, reject) => {
    Utils.invokeContract(`action=user_view, cid=${CID}`,
      (error, result, full) => {
        if (!error) {
          resolve(result);
        } else reject(error.error);
      }, payload || null);
  });
}

export function UserLockPrePhase<T = any>({ amountBeamX, lockPeriods }:IUserViewPrePhase): Promise<T> {
  return new Promise((resolve, reject) => {
    Utils.invokeContract(`
    action=user_lock_prephase,
    cid=${CID},
    amountBeamX=${amountBeamX} 
    lockPeriods=${lockPeriods}`,
    (error, result, full) => {
      if (!error) {
        onMakeTx(error, result, full).then((res) => {
          if (res) {
            resolve(res);
          }
          resolve(result);
        });
      } else {
        reject(error.error);
      }
    });
  });
}
