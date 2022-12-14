import React from 'react';
import { useHistory } from 'react-router-dom';
import { IconChevronRight } from '@douyinfe/semi-icons';

import styles from './style.module.css';

interface Props {
  title: string;
  route: string;
}

const LinkTitle: React.FC<Props> = ({ title, route }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(route);
  };

  return (
    <div onClick={handleClick} className={styles.root}>
      {title}
      <IconChevronRight />
    </div>
  );
};

export default LinkTitle;
