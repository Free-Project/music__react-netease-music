import React from 'react';
import { Type_MyMusic } from 'apis/types/business';
import {
  HTMLMediaState,
  HTMLMediaControls,
} from 'hooks/utils/createHTMLMediaHook';
import { getMusicUrl } from 'helpers/business';
import {
  MODE,
  setPlayHistory,
  playHistory as playHistoryLocalStorage,
  playMode as playModeLocalStorage,
  playList as playListLocalStorage,
} from 'helpers/play';
import { Type_Action } from './types';

// Actions
const PLAY = 'PLAY';
const SET_PLAY_LIST = 'SET_PLAY_LIST';
const CLEAR_PLAY_LIST = 'CLEAR_PLAY_LIST';
const SET_PLAY_MODE = 'SET_PLAY_MODE';
const SHOW_LYRIC = 'SHOW_LYRIC';
const HIDE_LYRIC = 'HIDE_LYRIC';
const CLEAR_PLAY_HISTORY = 'CLEAR_PLAY_HISTORY';

export const ACTIONS = {
  PLAY,
  SET_PLAY_LIST,
  CLEAR_PLAY_LIST,
  SET_PLAY_MODE,
  SHOW_LYRIC,
  HIDE_LYRIC,
  CLEAR_PLAY_HISTORY,
};

// Reducer
export interface Type_State {
  musicId: number;
  musicUrl: string;
  music?: Type_MyMusic;
  playMode: MODE;
  showLyric: boolean;
}

export const initialState = {
  musicId: 0,
  musicUrl: '',
  playMode: playModeLocalStorage.getItem(),
  showLyric: false,
};

const playMusicReducer = (
  state: Type_State,
  { type, payload }: Type_Action,
) => {
  switch (type) {
    case ACTIONS.PLAY: {
      if (!payload?.keepOrder) {
        setPlayHistory(payload?.music);
      }

      return {
        ...state,
        musicId: payload?.musicId,
        musicUrl: getMusicUrl(payload?.musicId),
        music: payload?.music,
      };
    }
    case ACTIONS.SET_PLAY_LIST: {
      const playList = payload?.playList || [];
      playListLocalStorage.setItem(playList);
      return state;
    }
    case ACTIONS.CLEAR_PLAY_LIST: {
      playListLocalStorage.removeItem();
      return state;
    }
    case ACTIONS.SET_PLAY_MODE: {
      playModeLocalStorage.setItem(payload?.playMode);

      return {
        ...state,
        playMode: payload?.playMode || MODE.PLAY_IN_ORDER,
      };
    }
    case ACTIONS.SHOW_LYRIC: {
      return {
        ...state,
        showLyric: true,
      };
    }
    case ACTIONS.HIDE_LYRIC: {
      return {
        ...state,
        showLyric: false,
      };
    }
    case ACTIONS.CLEAR_PLAY_HISTORY: {
      playHistoryLocalStorage.removeItem();
      return state;
    }
    default:
      return state;
  }
};

export default playMusicReducer;

export interface Type_AudioContext {
  audio?: React.ReactElement<any> | undefined;
  state?: HTMLMediaState;
  controls?: HTMLMediaControls;
  ref?: {
    current: HTMLAudioElement | null;
  };
}

// Context
export const PlayMusicStateContext =
  React.createContext<Type_State>(initialState);
export const PlayMusicDispatchContext = React.createContext<
  React.Dispatch<Type_Action>
>(() => {});
export const AudioContext = React.createContext<Type_AudioContext>({});
