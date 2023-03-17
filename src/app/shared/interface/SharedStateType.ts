import {IUserView, IViewParams} from '@app/shared/interface/Response';

export interface SharedStateType {
  routerLink: string;
  errorMessage: string | null;
  systemState: any;
  isLoaded: boolean;
}

export interface IDAOAccum {
  params: IViewParams[],
  balance: IUserView[]
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
  NONE = 0,
  THREE = 1,
  SIX = 2,
  NINE = 3,
  TWELVE = 4,
}
