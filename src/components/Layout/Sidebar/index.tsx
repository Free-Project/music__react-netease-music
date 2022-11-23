import React from 'react';
import { Dropdown, Popover } from '@douyinfe/semi-ui';
import { IconUser, IconExit } from '@douyinfe/semi-icons';

import Menus from './Menus';
import SongList from './SongList';
import MusicDetail from './MusicDetail';
import LoginDialog from './LoginDialog';
import authApis from 'apis/auth';
import songListApis from 'apis/songlist';
import useAsyncFn from 'hooks/useAsyncFn';
import { LogStateContext, LogDispatchContext, ACTIONS } from 'reducers/log';
import { PlayMusicStateContext } from 'reducers/playMusic';
import styles from './style.module.css';

const { useState, useContext, useEffect } = React;

const Sidebar = () => {
  const playState = useContext(PlayMusicStateContext);
  const dispatch = useContext(LogDispatchContext);
  const logState = useContext(LogStateContext);
  const { isLogined, user } = logState;

  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [, logoutFn] = useAsyncFn(authApis.logout);
  const [songListState, getUserSongListFn] = useAsyncFn(
    songListApis.getUserSongList,
  );

  useEffect(() => {
    if (isLogined) {
      getUserSongListFn(logState.user.userId);
    }
  }, [isLogined]);

  const handleNameClick = () => setShowLoginDialog(true);
  const handleLoginDialogClose = () => setShowLoginDialog(false);

  const handleLogout = async () => {
    await logoutFn();
    dispatch({ type: ACTIONS.LOGOUT });
  };

  return (
    <div className={styles.root}>
      <div className={styles.user}>
        <div className={styles.avatar}>
          {isLogined ? (
            <img src={user.profile.avatarUrl} loading='lazy' />
          ) : (
            <IconUser />
          )}
        </div>
        {isLogined ? (
          <Popover
            showArrow
            content={
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>
                  <IconExit /> 退出登录
                </Dropdown.Item>
              </Dropdown.Menu>
            }
          >
            <div className={styles.name}>
              <span>{user.profile.nickname}</span>
            </div>
          </Popover>
        ) : (
          <div className={styles.name} onClick={handleNameClick}>
            <span>未登录</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <Menus />
        {!songListState.loading && isLogined && (
          <>
            <div className={styles.block}>
              <SongList title='创建的歌单' data={songListState.value?.create} />
            </div>

            <div className={styles.block}>
              <SongList
                title='收藏的歌单'
                data={songListState.value?.collect}
              />
            </div>
          </>
        )}
      </div>

      {showLoginDialog && (
        <LoginDialog
          isOpen={showLoginDialog}
          onClose={handleLoginDialogClose}
        />
      )}
      {!!playState.musicId && <MusicDetail />}
    </div>
  );
};

export default Sidebar;
