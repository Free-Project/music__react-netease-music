import React from 'react';
import {
  IconVolume1,
  IconVolume2,
  IconDownloadStroked,
} from '@douyinfe/semi-icons';
import cn from 'classnames';

import Table, { Type_Column } from 'components/Table';
import VipIcon from 'components/VipIcon';
import {
  Type_Music,
  Type_Artist,
  Type_Album,
  MUSIC_STATUS,
  MUSIC_TYPE,
} from 'apis/types/business';
import albumApis from 'apis/album';
import { formatTime } from 'helpers/time';
import { createMusic } from 'helpers/business';
import {
  PlayMusicStateContext,
  PlayMusicDispatchContext,
  AudioContext,
  ACTIONS,
} from 'reducers/playMusic';
import styles from './style.module.css';

interface Props {
  data: Type_Music[];
  onPlayAll?: (autoPlay?: boolean) => void;
}

const { useContext } = React;

const MusicList: React.FC<Props> = ({ data, onPlayAll }) => {
  const state = useContext(PlayMusicStateContext);
  const dispatch = useContext(PlayMusicDispatchContext);
  const audioInfo = useContext(AudioContext);

  const columns: Type_Column<Type_Music, keyof Type_Music>[] = [
    {
      title: '',
      key: 'name',
      width: '80px',
      render: (name: string, record: Type_Music, index?: number) => {
        return (
          <div className={styles.operations}>
            {state.musicId === record.id ? (
              <span className={styles.isPlaying}>
                {audioInfo.state?.paused ? <IconVolume1 /> : <IconVolume2 />}
              </span>
            ) : (
              <span className={styles.index}>{(index || 0) + 1}</span>
            )}
            <IconDownloadStroked />
          </div>
        );
      },
    },
    {
      title: '音乐标题',
      key: 'name',
      width: '45%',
      render: (name: string, { alias, id, fee }: Type_Music) => {
        return (
          <>
            <div
              className={cn(styles.name, state.musicId === id && styles.active)}
            >
              <span>{name}</span>
              {fee === MUSIC_TYPE.VIP && <VipIcon />}
            </div>
            {alias?.length ? (
              <div className={styles.alias}>{alias.join(' ')}</div>
            ) : null}
          </>
        );
      },
    },
    {
      title: '歌手',
      key: 'artists',
      width: '15%',
      render: (artists: Type_Artist[]) =>
        artists?.map(({ name }) => name).join(' / '),
    },
    {
      title: '专辑',
      key: 'album',
      width: '20%',
      render: (album: Type_Album) => album?.name,
    },
    {
      title: '时长',
      key: 'duration',
      width: '10%',
      render: (duration: number) => formatTime(duration / 1000),
    },
  ];

  const handleDoubleClick = async (item: Type_Music) => {
    let { picUrl } = item;

    if (!picUrl) {
      const result = await albumApis.getAlbum(item.album.id);
      picUrl = result?.album.blurPicUrl;
    }

    dispatch({
      type: ACTIONS.PLAY,
      payload: {
        musicId: item.id,
        music: createMusic({
          ...item,
          picUrl,
          duration: item.duration / 1000,
        }),
      },
    });

    onPlayAll && onPlayAll();
  };

  const checkIsRecordRowDisabled = (record: Type_Music) =>
    record.status === MUSIC_STATUS.NOT_FOUND;

  return (
    <div>
      <Table<Type_Music>
        columns={columns}
        data={data}
        onDoubleClick={handleDoubleClick}
        isRecordRowDisabled={checkIsRecordRowDisabled}
      />
    </div>
  );
};

export default MusicList;
