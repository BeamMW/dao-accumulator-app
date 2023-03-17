import { GROTHS_IN_BEAM } from '@app/shared/constants';
import { LOCK_PERIOD_MONTH } from '@app/shared/interface';

const LENGTH_MAX = 6;
export function fromGroths(value: number): string | number {
  return value && value !== 0 ? value / GROTHS_IN_BEAM : 0;
}

export function toGroths(value: number): number {
  const val = Number(parseFloat((value * GROTHS_IN_BEAM).toString()).toPrecision(12));
  return value > 0 ? Math.floor(val) : 0;
}
export function truncate(value: string, len = LENGTH_MAX): string {
  if (!value) {
    return '';
  }

  if (value.length <= len) {
    return value;
  }

  return `${value.slice(0, len)}…`;
}
export const getLockPeriod = (period: number) => {
  let lockPeriod = null;

  if (period === LOCK_PERIOD_MONTH.NONE) {
    lockPeriod = 'none';
  }

  if (period === LOCK_PERIOD_MONTH.THREE) {
    lockPeriod = '3 month';
  }

  if (period === LOCK_PERIOD_MONTH.SIX) {
    lockPeriod = '6 month';
  }
  if (period === LOCK_PERIOD_MONTH.NINE) {
    lockPeriod = '9 month';
  }
  if (period === LOCK_PERIOD_MONTH.TWELVE) {
    lockPeriod = '12 month';
  }

  return lockPeriod;
};
