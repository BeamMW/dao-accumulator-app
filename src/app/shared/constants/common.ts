import { LOCK_PERIOD_MONTH } from '@app/shared/interface';

export const REG_AMOUNT = /^(?!0\d)(\d+)(\.)?(\d{0,8})?$/;
export const BEAM_ASSET_ID = 0;
export const BEAMX_ASSET_ID = 367;
export const GROTHS_IN_BEAM = 100000000;
export const TITLE_SECTIONS = {
  LOCK_AMOUNT_BEAM: 'Beam',
  LOCK_AMOUNT_BEAMX: 'BeamX',
  LOCK_PERIOD: 'Lock period',
};
export const PLACEHOLDER = {
  SELECT_LOCK_MONTH: 'Select lock period',
};
export const LOCK_PERIOD_SELECT = [
  { value: LOCK_PERIOD_MONTH.NONE, label: 'none' },
  { value: LOCK_PERIOD_MONTH.THREE, label: '3 month' },
  { value: LOCK_PERIOD_MONTH.SIX, label: '6 month' },
  { value: LOCK_PERIOD_MONTH.NINE, label: '9 month' },
  { value: LOCK_PERIOD_MONTH.TWELVE, label: '12 month' },
];
export const BALANCE_TITLE = [
  { title: 'BeamX:' },
  { title: 'Lock period:' },
  { title: 'Early Bird Stake' },
  { title: 'Regular Stake' },
  { title: 'Unlock Height' },
];
