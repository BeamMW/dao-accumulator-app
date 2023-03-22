import { createAsyncAction, createAction } from 'typesafe-actions';
import {IUserView, IViewParams} from '@app/shared/interface';
import { MainActionsTypes } from '@app/shared/constants/constants';
import {IUserUpdate, IUserViewPrePhase} from '@app/shared/interface/Request';

export const setAppParams = createAction(MainActionsTypes.SET_VIEW_PARAMS)<IViewParams>();
export const setUserView = createAction(MainActionsTypes.SET_USER_VIEW)<IUserView>();

export const loadAppParams = createAsyncAction(
  MainActionsTypes.LOAD_PARAMS,
  MainActionsTypes.LOAD_PARAMS_SUCCESS,
  MainActionsTypes.LOAD_PARAMS_FAILURE,
)<ArrayBuffer, any, any>();
export const loadUserView = createAsyncAction(
  MainActionsTypes.LOAD_USER_VIEW,
  MainActionsTypes.LOAD_USER_VIEW_SUCCESS,
  MainActionsTypes.LOAD_USER_VIEW_FAILURE,
)<ArrayBuffer, any, any>();
export const addUserPrePhase = createAsyncAction(
  MainActionsTypes.ADD_USER_PREPHASE,
  MainActionsTypes.ADD_USER_PREPHASE_SUCCESS,
  MainActionsTypes.ADD_USER_PREPHASE_FAILURE,
)<IUserViewPrePhase>();
export const userUpdate = createAsyncAction(
  MainActionsTypes.USER_UPDATE,
  MainActionsTypes.USER_UPDATE_SUCCESS,
  MainActionsTypes.USER_UPDATE_FAILURE,
)<IUserUpdate>();
