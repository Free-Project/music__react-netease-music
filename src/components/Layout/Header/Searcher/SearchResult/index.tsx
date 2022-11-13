import React from 'react';
import { IconUser, IconSong, IconDisc, IconVideo } from '@douyinfe/semi-icons';

import Item from './Item';
import albumApis from 'apis/album';
import type {
  Type_Album,
  Type_Artist,
  Type_Music,
  Type_MV,
} from 'apis/types/business';
import type { Type_SearchSuggestResponse } from 'apis/types/search';
import { PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic';
import { createMusic } from 'helpers/business';

import styles from './style.module.css';

const { useContext } = React;

interface Props {
  data: Type_SearchSuggestResponse;
}

const SearchResult: React.FC<Props> = ({ data }) => {
  const dispatch = useContext(PlayMusicDispatchContext);
  const { order } = data;

  const config: {
    [key: string]: any;
  } = {
    songs: {
      title: '单曲',
      icon: <IconSong />,
      renderLabel: (item: Type_Music) =>
        `${item.name} - ${item.artists.map(({ name }) => name).join(' / ')}`,
      onItemClick: async (item: Type_Music) => {
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
      },
    },
    albums: {
      title: '专辑',
      icon: <IconDisc />,
      renderLabel: (item: Type_Album) => `${item.name} - ${item?.artist?.name}`,
    },
    artists: {
      title: '歌手',
      icon: <IconUser />,
      renderLabel: (item: Type_Artist) => `${item.name}`,
    },
    mvs: {
      title: '视频',
      icon: <IconVideo />,
      renderLabel: (item: Type_MV) => `${item.name} - ${item.artistName}`,
    },
  };

  return (
    <div>
      {order?.map((type) => {
        const configOfType = config[type];
        const itemData = data[type];

        if (!configOfType) {
          return null;
        }

        return <Item key={type} {...configOfType} data={itemData} />;
      })}
      {!order && <div className={styles.empty}>没有结果喔</div>}
    </div>
  );
};

export default SearchResult;
