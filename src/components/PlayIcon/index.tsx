import React from 'react';
import { IconPlay } from '@douyinfe/semi-icons';
import cn from 'classnames';

import styles from './style.module.css';

interface IProps {
  className?: string;
}

const PlayIcon: React.FC<IProps> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <IconPlay />
    </div>
  );
};

export default PlayIcon;
