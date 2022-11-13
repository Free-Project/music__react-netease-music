import React, { useEffect } from 'react';
import cn from 'classnames';
import { Col, Row, Spin } from '@douyinfe/semi-ui';

import useAsyncFn from 'hooks/useAsyncFn';
import topListApis from 'apis/topList';

import CoverPlay from './CoverPlay';

import styles from './style.module.css';

const TopList = () => {
  const [topList, getTopListsFn] = useAsyncFn(topListApis.getTopListDetail);

  useEffect(() => {
    getTopListsFn();
  }, []);

  const toPlaylist = (iten) => {
    //
  };

  return (
    <div>
      {topList.loading ? (
        <Spin />
      ) : (
        <div>
          <div className={styles['list-head']}>官方榜</div>
          <Row gutter={[16, 24]}>
            {(topList?.value?.list || []).slice(0, 4).map((item) => {
              return (
                <Col span={12} key={item.id}>
                  <div className={styles.flex} onClick={() => toPlaylist(item)}>
                    <div
                      className={cn(styles['flex-shrink-0'], styles['w-36'])}
                    >
                      <CoverPlay
                        name={item.name}
                        picUrl={item.coverImgUrl}
                        showPlayCount={true}
                        playCount={item.playCount}
                        onPlay={toPlaylist}
                        video={false}
                      />
                    </div>
                    <div className={styles['flex-1']}>
                      <ul>
                        {(item.tracks || []).map((track, index) => {
                          return (
                            <li className={styles.flex} key={index}>
                              <span className='mr-1'>{index + 1}</span>{' '}
                              <div className='flex-auto w-20'>
                                {track.first} - {track.second}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>

          <div className={styles['list-head']}>特色榜</div>
          <Row gutter={[16, 24]}>
            {(topList?.value?.list || []).slice(4).map((iten) => {
              return (
                <Col span={6} key={iten.id}>
                  <CoverPlay
                    name={iten.name}
                    picUrl={iten.coverImgUrl}
                    showPlayCount={false}
                    playCount={iten.playCount}
                    onPlay={toPlaylist}
                    video={false}
                  />
                </Col>
              );
            })}
          </Row>
        </div>
      )}
    </div>
  );
};

export default TopList;
