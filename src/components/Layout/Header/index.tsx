import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  IconClose,
  IconMinus,
  IconExpand,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
} from '@douyinfe/semi-icons';

import Navbar from './Navbar';
import Searcher from './Searcher';
import {
  PlayMusicStateContext,
  PlayMusicDispatchContext,
  ACTIONS,
} from 'reducers/playMusic';
import { REPOSITORY } from 'constants/github';
import styles from './style.module.css';

const { useContext } = React;

const Header = () => {
  const history = useHistory();
  const dispatch = useContext(PlayMusicDispatchContext);
  const state = useContext(PlayMusicStateContext);
  const { showLyric } = state;

  const handleGoBack = () => history.goBack();
  const handleGoForward = () => history.goForward();

  const hideLyric = () => {
    dispatch({
      type: ACTIONS.HIDE_LYRIC,
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.actions}>
        <div className={styles.iconsWrap}>
          <div className={styles.circle}>
            <IconClose />
          </div>
          <div className={styles.circle}>
            <IconMinus />
          </div>
          <div className={styles.circle}>
            <IconExpand />
          </div>
          {showLyric && (
            <div className={styles.down} onClick={hideLyric}>
              <IconChevronDown />
            </div>
          )}
        </div>

        {!showLyric && (
          <div className={styles.backForward}>
            <div onClick={handleGoBack}>
              <IconChevronLeft />
            </div>
            <div onClick={handleGoForward}>
              <IconChevronRight />
            </div>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div>{!showLyric && <Navbar />}</div>
        <div className={styles.operations}>
          <Searcher />
          <div
            className={styles.githubLogo}
            onClick={() => window.open(REPOSITORY)}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
