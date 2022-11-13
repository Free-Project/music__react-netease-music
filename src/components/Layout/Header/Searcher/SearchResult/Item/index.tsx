import React from 'react';

import type {
  Type_Album,
  Type_Artist,
  Type_Music,
  Type_MV,
} from 'apis/types/business';
import { noop } from 'helpers/fn';
import styles from './style.module.css';

type Type = Type_Album | Type_Artist | Type_Music | Type_MV;

interface Type_ItemProps {
  title: string;
  icon: any;
  data: Type[];
  renderLabel: (item: any) => string;
  onItemClick?: (item: any) => void;
}

const Item: React.FC<Type_ItemProps> = ({
  title,
  icon,
  data,
  renderLabel,
  onItemClick = noop,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {icon}
        {title}
      </div>
      <div className={styles.content}>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className={styles.item}
              onClick={() => onItemClick(item)}
            >
              {renderLabel(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Item;
