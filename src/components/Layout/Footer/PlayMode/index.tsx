import React from 'react';
import { Tooltip } from '@douyinfe/semi-ui';
import { IconDescend2, IconSync, IconPulse } from '@douyinfe/semi-icons';

import { MODE } from 'helpers/play';
import {
  PlayMusicStateContext,
  PlayMusicDispatchContext,
  ACTIONS,
} from 'reducers/playMusic';

const MODE_ORDER = [
  MODE.PLAY_IN_ORDER,
  MODE.SINGLE_CYCLE,
  MODE.SHUFFLE_PLAYBACK,
];

const MODE_MAP: Type_Dictionary<{
  label: string;
  name?: string;
  icon: any;
}> = {
  [MODE.PLAY_IN_ORDER]: {
    label: '顺序播放',
    name: 'sort',
    icon: <IconDescend2 />,
  },
  [MODE.SINGLE_CYCLE]: {
    label: '单曲循环',
    name: 'repeat',
    icon: <IconSync />,
  },
  [MODE.SHUFFLE_PLAYBACK]: {
    label: '随机播放',
    name: 'random',
    icon: <IconPulse />,
  },
};

const { useContext, useCallback } = React;

const PlayMode = () => {
  const dispatch = useContext(PlayMusicDispatchContext);
  const state = useContext(PlayMusicStateContext);
  const { playMode } = state;

  const handleClick = useCallback(() => {
    const idx = MODE_ORDER.findIndex((m) => m === playMode);
    const nextMode = MODE_ORDER[(idx + 1) % MODE_ORDER.length];

    dispatch({
      type: ACTIONS.SET_PLAY_MODE,
      payload: {
        playMode: nextMode,
      },
    });
  }, [dispatch, playMode]);

  return (
    <Tooltip content={MODE_MAP[playMode].label}>
      <div onClick={handleClick}>{MODE_MAP[playMode].icon}</div>
    </Tooltip>
  );
};

export default PlayMode;
