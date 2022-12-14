import React, { useContext, useState, useCallback } from 'react';
import { Tooltip } from '@douyinfe/semi-ui';
import { IconChevronUp, IconChevronDown } from '@douyinfe/semi-icons';
import cn from 'classnames';

import Artists from 'components/Artists';
import AudioTimer from './AudioTimer';
import ProgressBar from './ProgressBar';
import PlayRecord from './PlayRecord';
import PlayMode from './PlayMode';
import PlayOperations from './PlayOperations';
import PlayVolume from './PlayVolume';
import {
  PlayMusicStateContext,
  PlayMusicDispatchContext,
  ACTIONS,
} from 'reducers/playMusic';
import styles from './style.module.css';

const Footer = () => {
  const [showPlayRecord, setShowPlayRecord] = useState(false);
  const dispatch = useContext(PlayMusicDispatchContext);
  const state = useContext(PlayMusicStateContext);
  const { musicId, music, showLyric } = state;

  const togglePlayRecord = useCallback(() => {
    setShowPlayRecord(!showPlayRecord);
  }, [showPlayRecord, setShowPlayRecord]);

  const handleShowLyric = useCallback(() => {
    dispatch({
      type: ACTIONS.SHOW_LYRIC,
    });
  }, [dispatch]);

  const handleHideLyric = useCallback(() => {
    dispatch({
      type: ACTIONS.HIDE_LYRIC,
    });
  }, [dispatch]);

  return (
    <div className={styles.root}>
      {musicId ? (
        <div className={styles.progressBar}>
          <ProgressBar />
        </div>
      ) : null}

      <div className={styles.songWrap}>
        {!!musicId && (
          <>
            <div className={cn(styles.pic, !showLyric && styles.showLyric)}>
              <img
                src={
                  music?.album?.picUrl
                    ? `${music?.album?.picUrl}?param=40y40`
                    : undefined
                }
                loading='lazy'
              />
              {!showLyric && (
                <div className={styles.mask} onClick={handleShowLyric}>
                  <IconChevronUp />
                </div>
              )}
              {showLyric && (
                <div
                  className={cn(styles.mask, styles.hideLyric)}
                  onClick={handleHideLyric}
                >
                  <IconChevronDown />
                </div>
              )}
            </div>
            <div>
              <div className={styles.info}>
                <div className={styles.name}>{`${music?.name || '--'} -`}</div>
                <Artists artists={state?.music?.artists} />
              </div>
              <div className={styles.time}>
                <AudioTimer />
              </div>
            </div>
          </>
        )}
      </div>

      <div className={styles.operations}>
        <PlayOperations />
      </div>

      <div className={styles.otherOperations}>
        <div className={styles.item}>
          <PlayMode />
        </div>
        <div onClick={togglePlayRecord} className={styles.item}>
          <Tooltip content={'??????????????????'}>
            <div className={showPlayRecord ? 'active' : ''}> ????????????</div>
          </Tooltip>
        </div>
        <div className={styles.item}>
          <PlayVolume />
        </div>
      </div>

      <PlayRecord
        show={showPlayRecord}
        onClickAway={() => setShowPlayRecord(false)}
      />
    </div>
  );
};

export default Footer;
