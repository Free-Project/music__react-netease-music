import React from 'react';

import SongListItem from './SongListItem';
import styles from './style.module.css';
import type { Type_SongList } from 'apis/types/business';

interface Props {
  data?: Type_SongList[];
}

const SongLists: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.root}>
      {data?.map(({ id, name, playCount, picUrl, coverImgUrl }, index) => {
        return (
          <SongListItem
            key={index}
            id={id}
            name={name}
            playCount={playCount}
            picUrl={picUrl || coverImgUrl}
          />
        );
      })}
    </div>
  );
};

export default SongLists;
