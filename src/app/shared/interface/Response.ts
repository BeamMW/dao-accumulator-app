export interface IViewParams {
  ['aid-beamX']: number,
  hPreEnd: number,
  ['locked-Beam']: number,
  ['locked-BeamX']: number,
}
export interface IUserView {
  ['avail-BeamX']: number
  ['lock-periods']: number
  ['lpToken-post']: number
  ['lpToken-pre']: number
  ['unlock-height']: number
  lpToken: number
}
export interface IBalanceFull {
  res: IUserView[]
  ['res-nph']: IUserView[]
}
export interface IPredict {
  daily_reward: number
}
