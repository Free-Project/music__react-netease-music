import React from 'react';
import { Popover } from '@douyinfe/semi-ui';
import cn from 'classnames';

import {
  Type_GetSongListCatsResponse,
  Type_Category,
} from 'apis/types/songList';
import { noop } from 'helpers/fn';
import styles from './style.module.css';

interface Props {
  cats?: Type_GetSongListCatsResponse;
  hotCats?: Type_Category[];
  selectedCat?: string;
  onCatSelect?: (cat: string) => void;
}

const { useState } = React;

export const DEFAULT_CAT = '全部';

const Categories: React.FC<Props> = ({
  cats,
  hotCats,
  selectedCat,
  onCatSelect = noop,
}) => {
  const [currentCat, setCurrentCat] = useState(selectedCat || DEFAULT_CAT);
  const [popoverVisible, setPopoverVisible] = useState(false);

  const handleCatClick = (cat: string) => {
    setCurrentCat(cat);
    onCatSelect(cat);
  };

  const handleCurrentCatClick = () => {
    setPopoverVisible(!popoverVisible);
  };

  const handleClickPopoverOutSide = () => {
    setPopoverVisible(false);
  };

  const renderCats = () => {
    return (
      <div className={styles.popover}>
        <div className={styles.all}>
          <span
            className={currentCat === DEFAULT_CAT ? 'active' : ''}
            onClick={() => handleCatClick(DEFAULT_CAT)}
          >
            全部歌单
          </span>
        </div>
        <div className={styles.content}>
          {Object.entries(cats?.categories || {}).map(([key, value]) => {
            const subCats = cats?.sub.filter(
              ({ category }) => category === Number(key),
            );
            return (
              <div className={styles.catBlock} key={key}>
                <div className={styles.label}>{value}</div>
                <div className={styles.content}>
                  {subCats?.map(({ name }) => {
                    return (
                      <div
                        key={name}
                        className={cn(
                          styles.tag,
                          currentCat === name && styles.active,
                        )}
                        onClick={() => handleCatClick(name)}
                      >
                        {name}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.cats}>
        <Popover
          showArrow
          visible={popoverVisible}
          content={renderCats()}
          position='right'
          trigger='custom'
          onClickOutSide={handleClickPopoverOutSide}
        >
          <div className={styles.catsBtn} onClick={handleCurrentCatClick}>
            {currentCat}
          </div>
        </Popover>
      </div>
      <div className={styles.hotCats}>
        {hotCats?.map(({ name }) => {
          return (
            <div
              key={name}
              className={cn(styles.tag, currentCat === name && styles.active)}
              onClick={() => handleCatClick(name)}
            >
              {name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
