import React from 'react';
import classNames from 'classnames';
import styles from './style.module.css';

interface Type_SingerFilterProps {
  filterList?: { key?: string; name?: string }[];
  curTag?: string;
  onTagClick?: (key?: string) => void;
}

function SingerFilter(props: Type_SingerFilterProps) {
  const { filterList, curTag, onTagClick } = props;
  return (
    <ul className={styles.flex}>
      {filterList?.map((filterItem) => {
        const { name, key } = filterItem;
        return (
          <li
            key={key || name}
            className={classNames(
              styles.group,
              styles['text-center'],
              styles['cursor-pointer'],
              styles['txt-sm'],
              {
                active: curTag === key,
              },
            )}
            onClick={() => {
              onTagClick?.(key);
            }}
          >
            <span>{name}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default SingerFilter;
