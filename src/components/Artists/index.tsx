import React from 'react';

import type { Type_Artist } from 'apis/types/business';
import styles from './style.module.css';

interface Props {
  artists?: Type_Artist[];
}

const Artists: React.FC<Props> = ({ artists }) => {
  return (
    <div className={styles.root}>
      {artists?.map(({ name }, index) =>
        index !== artists?.length - 1 ? (
          <div key={name}>
            <span className={styles.singer}>{name}</span>
            <span className={styles.slash}>/</span>
          </div>
        ) : (
          <span key={name} className={styles.singer}>
            {name}
          </span>
        ),
      )}
    </div>
  );
};

export default Artists;
