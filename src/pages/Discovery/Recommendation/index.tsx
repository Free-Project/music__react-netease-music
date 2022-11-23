import React from 'react';
import Banner from './Banner';
import SongList from './SongList';
import LatestMusic from './LatestMusic';
import MV from './MV';

import { USER_PROFILE } from 'constants/github';

import styles from './style.module.css';

const Recommendation = () => {
  return (
    <div className={styles.root}>
      <Banner />

      <div className={styles.block}>
        <SongList />
      </div>

      <div className={styles.block}>
        <LatestMusic />
      </div>

      <div className={styles.block}>
        <MV />
      </div>

      <div className={styles.footer}>
        {new Date().getFullYear()}{' '}
        <a href={USER_PROFILE} target='_blank' rel='noreferrer'>
          @Free-Project
        </a>
      </div>
    </div>
  );
};

export default Recommendation;
