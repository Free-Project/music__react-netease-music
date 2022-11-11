import React, { useState, useEffect } from 'react';
import { Spinner } from '@blueprintjs/core';
import SingerCategory from 'components/SingerCategory';
import useAsyncFn from 'hooks/useAsyncFn';
import singerListApis from 'apis/singerlist';
import type { Artist } from 'apis/types/singerlist';

const Singers = () => {
  const [searchInfo, setSearchInfo] = useState({
    initial: undefined,
    type: '-1',
    area: '-1',
  });

  const [state, getSingerListsFn] = useAsyncFn(singerListApis.getSingerlists);

  const [singerList, setSingerList] = useState<Artist[]>([]);

  const { initial, type, area } = searchInfo;

  useEffect(() => {
    getSingerListsFn(searchInfo);
  }, [searchInfo]);

  useEffect(() => {
    if (state?.value && state?.value?.artists) {
      setSingerList(state?.value?.artists || []);
    }
  }, [state?.value]);

  return (
    <div>
      <div>
        <SingerCategory
          curAlpha={initial}
          curArea={area}
          curCategory={type}
          onTagClick={(obj) => {
            setSearchInfo({ ...searchInfo, ...obj });
          }}
        />
        {state.loading ? (
          <Spinner className='spinner' />
        ) : (
          <ul>
            {(singerList || []).map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Singers;
