import React from 'react';

import { sessionLocalStorage } from 'helpers/session';
import { Type_Action } from './types';
import { Type_LoginResult } from 'apis/types/auth';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export const ACTIONS = {
  LOGIN,
  LOGOUT,
};

export interface Type_State {
  isLogined: boolean;
  user: Type_LoginResult;
}

const session = sessionLocalStorage.getItem();

export const initialState = {
  isLogined: !!session.userId,
  user: session,
};

const logReducer = (state: Type_State, action: Type_Action) => {
  switch (action.type) {
    case ACTIONS.LOGIN: {
      sessionLocalStorage.setItem(action.payload?.user);

      return {
        ...state,
        isLogined: true,
        user: action.payload?.user,
      };
    }
    case ACTIONS.LOGOUT: {
      sessionLocalStorage.removeItem();

      return {
        ...state,
        isLogined: false,
        user: {},
      };
    }
    default:
      return state;
  }
};

export default logReducer;

export const LogStateContext = React.createContext<Type_State>(initialState);
export const LogDispatchContext = React.createContext<
  React.Dispatch<Type_Action>
>(() => {});
