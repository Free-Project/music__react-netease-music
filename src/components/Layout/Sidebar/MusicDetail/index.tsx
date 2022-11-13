import React from 'react';
import { Spin } from '@douyinfe/semi-ui';
import cn from 'classnames';

import Lyric from './Lyric';
import Comments from './Comments';
import SongLists from './SongLists';
import SimiSongs from './SimiSongs';
import songApis from 'apis/song';
import useAsyncFn from 'hooks/useAsyncFn';
import { PlayMusicStateContext, AudioContext } from 'reducers/playMusic';
import playBar from 'assets/image/play-bar.png';
import playCd from 'assets/image/play-cd.png';
import styles from './style.module.css';

const { useContext, useEffect } = React;

const MusicDetail = () => {
  const audioInfo = useContext(AudioContext);
  const isPlaying = !audioInfo.state?.paused;

  const state = useContext(PlayMusicStateContext);
  const { showLyric, music, musicId } = state;

  const [songListState, getSimType_SongListFn] = useAsyncFn(
    songApis.getSimType_SongList,
  );
  const [simiSongState, getSimiSongFn] = useAsyncFn(songApis.getSimiSong);

  useEffect(() => {
    if (musicId && showLyric) {
      getSimType_SongListFn({ id: musicId });
      getSimiSongFn({ id: musicId });
    }
  }, [musicId, showLyric]);

  return (
    <div className={cn(styles.root, showLyric && styles.show)}>
      {showLyric && (
        <>
          <div className={styles.music}>
            <div className={styles.cdWrap}>
              <div className={styles.cd}>
                <div className={styles.bar}>
                  <img
                    src={playBar}
                    className={cn(styles.playBar, !isPlaying && styles.pause)}
                  />
                  <img src={playCd} className={styles.playCd} />
                </div>
                <div className={styles.circle}>
                  <div className={cn(styles.cover, isPlaying && styles.rotate)}>
                    <img
                      src={`${
                        music?.picUrl || music?.album?.blurPicUrl
                      }?param=190y190`}
                    />
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div className={styles.lyric}>
              <div className={styles.name}>{music?.name}</div>
              <div className={styles.artists}>
                歌手：
                <span>
                  {music?.artists.map(({ name }) => name).join(' / ')}
                </span>
              </div>
              <div className={styles.lrc}>
                <Lyric />
              </div>
            </div>
          </div>

          <div className={styles.relatedInfo}>
            <div className={styles.comment}>
              <Comments />
            </div>
            <div className={styles.relatedDetail}>
              {songListState.loading || simiSongState.loading ? (
                <Spin size='small' />
              ) : (
                <>
                  {!!songListState.value?.length && (
                    <div className={styles.block}>
                      <div className={styles.title}>包含这首歌的歌单</div>
                      <div>
                        <SongLists data={songListState.value || []} />
                      </div>
                    </div>
                  )}
                  <div className={styles.block}>
                    <div className={styles.title}>相似歌曲</div>
                    <div>
                      <SimiSongs data={simiSongState.value || []} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MusicDetail;
