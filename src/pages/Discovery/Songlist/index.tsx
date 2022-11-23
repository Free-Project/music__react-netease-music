import React, { useEffect, useState } from 'react';
import { Spin } from '@douyinfe/semi-ui';

import Pagination from 'components/Pagination';
import HighQuality from './HighQuality';
import Categories, { DEFAULT_CAT } from './Categories';
import SongLists from 'components/SongLists';
import songListApis from 'apis/songlist';
import useAsyncFn from 'hooks/useAsyncFn';
import { PAGE_SIZE, PAGE } from 'constants/pagination';
import styles from './style.module.css';

const SongList = () => {
  const [selectedCat, setSelectedCat] = useState(DEFAULT_CAT);
  const [page, setPage] = useState(PAGE);
  const [state, getSongListsFn] = useAsyncFn(songListApis.getSongLists);
  const [highQualityState, getHighQualitySongListFn] = useAsyncFn(
    songListApis.getHighQualitySongList,
  );
  const [catsState, getSongListCatsFn] = useAsyncFn(
    songListApis.getSongListCats,
  );
  const [hotCatsState, getSongListHotCatsFn] = useAsyncFn(
    songListApis.getSongListHotCats,
  );

  useEffect(() => {
    getSongListHotCatsFn();
    getSongListCatsFn();
    getSongListsFn({ cat: selectedCat });
    getHighQualitySongListFn(selectedCat);
  }, []);

  const handlePageChange = (page: number) => {
    const offset = (page - 1) * PAGE_SIZE;
    getSongListsFn({ cat: selectedCat, offset });
    setPage(page);
  };

  const handleCatSelect = (cat: string) => {
    getSongListsFn({ cat, offset: 0 });
    getHighQualitySongListFn(cat);
    setSelectedCat(cat);
    setPage(PAGE);
  };

  return (
    <div className={styles.root}>
      <div className={styles.highquality}>
        <HighQuality data={highQualityState.value} />
      </div>

      <div className={styles.categories}>
        <Categories
          cats={catsState.value}
          hotCats={hotCatsState.value}
          selectedCat={selectedCat}
          onCatSelect={handleCatSelect}
        />
      </div>

      <div>
        {state.loading ? (
          <Spin />
        ) : (
          <>
            <SongLists data={state.value?.playlists} />
            <div className='pagination'>
              <Pagination
                page={page}
                total={state.value?.total}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SongList;
