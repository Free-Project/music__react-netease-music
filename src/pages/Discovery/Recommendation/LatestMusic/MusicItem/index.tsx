import React from 'react';
import { IconVolume1, IconVolume2 } from '@douyinfe/semi-icons';
import cn from 'classnames';

import PlayIcon from 'components/PlayIcon';
import Artists from 'components/Artists';
import { Type_MusicSong } from 'apis/types/personalized';

import {
  PlayMusicStateContext,
  PlayMusicDispatchContext,
  ACTIONS,
  AudioContext,
} from 'reducers/playMusic';
import { createMusic } from 'helpers/business';
import styles from './style.module.css';

interface Props {
  id: number;
  name: string;
  picUrl: string;
  song: Type_MusicSong;
  index: number;
}

const { useContext } = React;

const MusicItem: React.FC<Props> = ({
  id,
  name,
  picUrl,
  song,
  index,
  ...others
}) => {
  const audioInfo = useContext(AudioContext);
  const state = useContext(PlayMusicStateContext);
  const dispatch = useContext(PlayMusicDispatchContext);

  const hasBorderBottom = [4, 9].indexOf(index) > -1;

  const playMusic = (id: number) => {
    dispatch({
      type: ACTIONS.PLAY,
      payload: {
        musicId: id,
        music: createMusic({
          id,
          name,
          picUrl,
          artists: song.artists,
          duration: song.duration / 1000,
          ...others,
        }),
      },
    });
  };

  const isMusicActive = state.musicId === id;

  return (
    <div
      className={cn(
        styles.root,
        hasBorderBottom && styles.borderBottom,
        isMusicActive && styles.active,
      )}
    >
      <div className={styles.pic} onClick={() => playMusic(id)}>
        <img src={`${picUrl}?param=60y60`} loading='lazy' />
        <PlayIcon className={styles.playIcon} />
      </div>
      {isMusicActive ? (
        <div className={styles.isPlaying}>
          {audioInfo?.state?.paused ? <IconVolume1 /> : <IconVolume2 />}
        </div>
      ) : (
        <div className={styles.order}>
          {index < 9 ? `0${index + 1}` : index + 1}
        </div>
      )}
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <Artists artists={song?.artists} />
      </div>
    </div>
  );
};

export default MusicItem;
