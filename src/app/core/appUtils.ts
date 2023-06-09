import { GROTHS_IN_BEAM, WITHDRAW } from '@app/shared/constants';
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
  let lockPeriod = '-';

  if (period === LOCK_PERIOD_MONTH.NONE) {
    lockPeriod = 'none';
  }

  if (period === LOCK_PERIOD_MONTH.THREE) {
    lockPeriod = '3 months';
  }

  if (period === LOCK_PERIOD_MONTH.SIX) {
    lockPeriod = '6 months';
  }
  if (period === LOCK_PERIOD_MONTH.NINE) {
    lockPeriod = '9 months';
  }
  if (period === LOCK_PERIOD_MONTH.TWELVE) {
    lockPeriod = '12 months';
  }

  return lockPeriod;
};

export const getTVL = (amountToken: number) => {
  const beam = fromGroths(amountToken);
  const beamx = fromGroths((amountToken) / 2);
  return `${beam} BEAM / ${beamx} BEAMX`;
};

export function getDays(willHeight: number, currentHeight: number): string {
  // Check if the parameters are valid numbers
  if (isNaN(willHeight) || isNaN(currentHeight)) {
    return NaN;
  }
  // Calculate the difference between will height and current height
  const diff = willHeight - currentHeight;
  // Check if the difference is positive
  if (diff <= 0) {
    return 0;
  }
  // Calculate the time in minutes by multiplying the difference by one
  const time = diff * 1;
  // Convert the time in minutes to days by dividing by 1440 (60 * 24)
  const days = time / 1440;
  // Return the days rounded up to the nearest integer
  return `${Math.ceil(days)} days`;
}
export function getTime(futureHeight: number, currentHeight: number): string {
  // Check if the parameters are valid numbers
  if (isNaN(futureHeight) || isNaN(currentHeight)) {
    return '-';
  }
  // Calculate the difference between future height and current height
  const diff = futureHeight - currentHeight;
  // Check if the difference is positive
  if (diff <= 0) {
    return WITHDRAW;
  }
  // Calculate the time in minutes by multiplying the difference by one
  const time = diff * 1;
  const mon = Math.ceil(((time / 60) / 24));
  const DAYS = mon === 1 ? 'day' : 'days';
  if (mon === 0) {
    return 'lock period ended';
  }
  // If more than one month away, convert the time in minutes to months by dividing by 43200 (60 * 24 *30) and return the months rounded up to the nearest integer
  return `~${mon} ${DAYS} (${futureHeight})`;
}
