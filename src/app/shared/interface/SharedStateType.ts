import { IUserView, IViewParams } from '@app/shared/interface/Response';

export interface SharedStateType {
  routerLink: string;
  errorMessage: string | null;
  systemState: any;
  isLoaded: boolean;
}

export interface IDAOAccum {
  params: IViewParams[],
  balance: IUserView[],
  predict: number,
  isLoading: boolean
}

export interface IValidations {
  isEmpty?: boolean;
  minLength?: number;
  isEmail?: boolean;
}

export interface IUseValidation {
  value: number;
  validations?: IValidations;
}
export interface IUseInput {
  initialValue: number;
  validations?: IValidations;
}

export interface IOptions {
  value: number;
  label: string;
}
export enum LOCK_PERIOD_MONTH {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  TEN = 10,
  ELEVEN = 11,
  TWELVE = 12,
}
