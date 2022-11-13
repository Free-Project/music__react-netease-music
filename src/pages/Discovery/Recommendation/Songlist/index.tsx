import React from 'react';
import { Spin } from '@douyinfe/semi-ui';

import LinkTitle from 'components/LinkTitle';
import SongLists from 'components/SongLists';

import ROUTES from 'constants/routes';
import useAsyncFn from 'hooks/useAsyncFn';
import personalizedApis from 'apis/personalized';
import styles from './style.module.css';

const { useEffect } = React;

const SongList = () => {
  const [state, personalizedSongListFn] = useAsyncFn(
    personalizedApis.getPersonalizedSongList,
  );
  const { value: songList = [], loading: isGettingSongList } = state || {};

  useEffect(() => {
    personalizedSongListFn({ limit: 10 });
  }, []);

  return (
    <div className={styles.root}>
      <LinkTitle title='推荐歌单' route={ROUTES.SONG_LIST} />
      {isGettingSongList ? <Spin /> : <SongLists data={songList} />}
    </div>
  );
};

export default SongList;
