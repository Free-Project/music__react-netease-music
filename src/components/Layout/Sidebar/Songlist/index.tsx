import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import cn from 'classnames';

import { LogStateContext } from 'reducers/log';
import type { Type_SongList } from 'apis/types/business';
import ROUTES from 'constants/routes';
import styles from './style.module.css';

interface Props {
  title: string;
  data?: Type_SongList[];
}

const { useContext } = React;

const SongList: React.FC<Props> = ({ title, data }) => {
  const history = useHistory();
  const routeMatch = useRouteMatch<{ songListId: string }>(
    ROUTES.SONG_LIST_DETAIL,
  );
  const logState = useContext(LogStateContext);

  const handleClick = (id: number) =>
    history.push(`${ROUTES.SONG_LISTS}/${id}`);

  return (
    <div className={styles.root}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>
        {data?.map(({ id, name, trackCount }) => {
          const isActive =
            routeMatch && Number(routeMatch.params.songListId) === id;
          const text = `${name.replace(
            logState.user.profile.nickname,
            '我',
          )}（${trackCount}首）`;
          return (
            <div
              key={id}
              title={text}
              className={cn(styles.item, isActive && 'active')}
              onClick={() => handleClick(id)}
            >
              {text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SongList;
