import React, { useState } from 'react';
import { Spin } from '@douyinfe/semi-ui';
import { useParams } from 'react-router-dom';
import Tabs from 'components/Tabs';
import MusicList from 'components/MusicList';
import BasicInfo from './BasicInfo';
import { createMusic, createMusicFromSimpleMusic } from 'helpers/business';
import songListApis from 'apis/songList';
import useAsyncFn from 'hooks/useAsyncFn';
import { PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic';
import styles from './style.module.css';

const { useEffect, useContext } = React;

const TABS = [
  {
    label: '歌曲列表',
    key: 'songList',
  },
  {
    label: '评论',
    key: 'comment',
  },
];

const SongListDetail = () => {
  const dispatch = useContext(PlayMusicDispatchContext);
  const params = useParams<Type_Dictionary<string>>();
  const { songListId } = params;
  const [unLoaded, setUnLoaded] = useState(true);
  const [songListDetail, getSongListDetailFn] = useAsyncFn(
    songListApis.getSongListDetail,
  );

  useEffect(() => {
    setUnLoaded(false);
  }, []);

  useEffect(() => {
    getSongListDetailFn({
      id: songListId,
    });
  }, [songListId]);

  const songDetail = songListDetail?.value;
  const songs = (songDetail?.tracks || []).map((item) => {
    return createMusicFromSimpleMusic(item);
  });

  const playAll = (autoPlay?: boolean) => {
    const list = songs.map((item) => {
      return createMusic({
        ...item,
        duration: item.duration / 1000,
      });
    });

    dispatch({
      type: ACTIONS.SET_PLAY_LIST,
      payload: {
        playList: list,
      },
    });

    if (autoPlay) {
      dispatch({
        type: ACTIONS.PLAY,
        payload: {
          musicId: list[0].id,
          music: list[0],
        },
      });
    }
  };

  return (
    <div className={styles.root}>
      {unLoaded && songListDetail.loading ? (
        <Spin />
      ) : (
        <>
          <div className={styles.basicInfo}>
            <BasicInfo data={songDetail} onPlayAll={playAll} />
          </div>
          <div className={styles.content}>
            <div className={styles.tabs}>
              <Tabs tabs={TABS} />
            </div>
            <MusicList data={songs} onPlayAll={playAll} />
          </div>
        </>
      )}
    </div>
  );
};

export default SongListDetail;
