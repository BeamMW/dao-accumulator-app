export interface IUserViewPrePhase {
  lockPeriods: number,
  amountLpToken: number,
  isNph: number
}
export interface IUserUpdate {
  hEnd: number,
  withdrawBeamX: number,
  withdrawLpToken: number,
  isNph: number
}
export interface IUserGetYield {
  amountLpToken: number
  lockPeriods: number,
  isNph: number
}
