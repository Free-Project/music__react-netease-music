import React from 'react';
import { IconPlay, IconPause, IconDeleteStroked } from '@douyinfe/semi-icons';
import cn from 'classnames';

import Table, { Type_Column } from 'components/Table';
import VipIcon from 'components/VipIcon';
import {
  Type_MyMusic,
  Type_Artist,
  MUSIC_STATUS,
  MUSIC_TYPE,
} from 'apis/types/business';
import { formatTime } from 'helpers/time';
import { PlayMusicStateContext, AudioContext } from 'reducers/playMusic';
import styles from './style.module.css';

interface Props {
  data: Type_MyMusic[];
  onDoubleClick: (item: Type_MyMusic) => void;
  onClear: () => void;
}

const { useContext } = React;

const List: React.FC<Props> = ({ data, onDoubleClick, onClear }) => {
  const state = useContext(PlayMusicStateContext);
  const audioInfo = useContext(AudioContext);

  const columns: Type_Column<Type_MyMusic, keyof Type_MyMusic>[] = [
    {
      key: 'name',
      width: '55%',
      render: (name: string, { id, fee }: Type_MyMusic) => {
        const isActive = state.musicId === id;
        return (
          <div className={cn(styles.name, isActive && 'active')}>
            {isActive &&
              (audioInfo.state?.paused ? <IconPause /> : <IconPlay />)}
            <div className={styles.text}>
              <span>{name}</span>
              {fee === MUSIC_TYPE.VIP && <VipIcon />}
            </div>
          </div>
        );
      },
    },
    {
      key: 'artists',
      width: '30%',
      render: (artists: Type_Artist[], { id }: Type_MyMusic) => {
        return (
          <div className={state.musicId === id ? 'active' : ''}>
            {artists?.map(({ name }) => name).join(' / ')}
          </div>
        );
      },
    },
    {
      key: 'duration',
      width: '15%',
      render: (duration: number) => formatTime(duration),
    },
  ];

  return (
    <>
      <div className={styles.header}>
        <div className={styles.count}>总{data.length}首</div>
        {data.length > 0 && (
          <div className={styles.actions}>
            <div onClick={onClear}>
              <IconDeleteStroked />
              {' 清空'}
            </div>
          </div>
        )}
      </div>
      <div className={styles.list}>
        <Table<Type_MyMusic>
          columns={columns}
          data={data}
          showHeader={false}
          onDoubleClick={onDoubleClick}
          isRecordRowDisabled={(item) => item.status === MUSIC_STATUS.NOT_FOUND}
        />
      </div>
    </>
  );
};

export default List;
