export interface IUserViewPrePhase {
  lockPeriods: number,
  amountLpToken: number
}
export interface IUserUpdate {
  hEnd: number,
  withdrawBeamX: number,
  withdrawLpToken: number
}
export interface IUserGetYield {
  amountLpToken: number
  lockPeriods: number
}
