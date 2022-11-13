import React from 'react';
import { IconPlay } from '@douyinfe/semi-icons';
import cn from 'classnames';

import { formatNum } from 'helpers/num';
import styles from './style.module.css';

interface Props {
  count: number;
  className?: string;
}

const PlayCount: React.FC<Props> = ({ count, className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <IconPlay />
      {formatNum(count)}
    </div>
  );
};

export default PlayCount;
