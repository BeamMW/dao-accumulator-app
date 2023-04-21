import { LOCK_PERIOD_MONTH } from '@app/shared/interface';

export const FARMING_PERIOD = true;

export const REG_AMOUNT = /^(?!0\d)(\d+)(\.)?(\d{0,8})?$/;
export const BEAM_ASSET_ID = 0;
export const BEAMX_ASSET_ID = 367;
export const LP_TOKEN_ASSET_ID = 385;
export const GROTHS_IN_BEAM = 100000000;
export const TITLE_SECTIONS = {
  LOCK_AMOUNT_BEAM: 'Beam',
  LOCK_AMOUNT_LP: ' BeamX Pool LP Token',
  LOCK_AMOUNT_BEAMX: 'BeamX',
  LOCK_PERIOD: 'Lock period',
};
export const PLACEHOLDER = {
  SELECT_LOCK_MONTH: 'Select lock period',
};
export const LOCK_PERIOD_SELECT = [
  { value: LOCK_PERIOD_MONTH.ONE, label: '1 month' },
  { value: LOCK_PERIOD_MONTH.TWO, label: '2 months' },
  { value: LOCK_PERIOD_MONTH.THREE, label: '3 months' },
  { value: LOCK_PERIOD_MONTH.FOUR, label: '4 months' },
  { value: LOCK_PERIOD_MONTH.FIVE, label: '5 months' },
  { value: LOCK_PERIOD_MONTH.SIX, label: '6 months' },
  { value: LOCK_PERIOD_MONTH.SEVEN, label: '7 months' },
  { value: LOCK_PERIOD_MONTH.EIGHT, label: '8 months' },
  { value: LOCK_PERIOD_MONTH.NINE, label: '9 months' },
  { value: LOCK_PERIOD_MONTH.TEN, label: '10 months' },
  { value: LOCK_PERIOD_MONTH.ELEVEN, label: '11 months' },
  { value: LOCK_PERIOD_MONTH.TWELVE, label: '12 months' },
];
export enum BALANCE_TITLE {
  EARLY_LP = 'Early Bird LP Tokens:',
  LOCK_BALANCE = 'My Balance:',
  FARMING_BALANCE = 'LOCK / UNLOCK LP TOKENS:',
  FARMED = 'Farmed BEAMX:',
  LOCK_PER = 'Lock period:',
  UNLOCK = 'Unlocking in:',
}

export const TABLE_HEADERS = [
  'LPToken',
  'Unlock (Height)',
];
export const TABLE_HEADERS_FARMING = [
  'BeamX',
  '',
  'LPToken',
  '',
  'Unlock (Height)',
];

export const WITHDRAW = 'You can withdraw your LP tokens';
