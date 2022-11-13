import React, { useState, useEffect } from 'react';
import { Spin } from '@douyinfe/semi-ui';
import SingerCategory from 'components/SingerCategory';
import useAsyncFn from 'hooks/useAsyncFn';
import singerListApis from 'apis/singerList';
import type { Artist } from 'apis/types/singerList';

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
          <Spin />
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
