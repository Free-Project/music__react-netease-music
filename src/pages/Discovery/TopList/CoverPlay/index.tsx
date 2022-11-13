import React from 'react';
import { Card } from '@douyinfe/semi-ui';

import { useNumberFormat } from 'helpers/number';

/**
 * CoverPlay
 */
export default ({ name, picUrl, showPlayCount, playCount, onPlay, video }) => {
  return (
    <div>
      <Card
        style={{ maxWidth: 300 }}
        bordered={false}
        cover={<img alt='example' src={picUrl} />}
      >
        <Card.Meta title={name} />
        {showPlayCount && (
          <div className='play-count'>
            <span>{useNumberFormat(playCount || 0)}</span>
          </div>
        )}
      </Card>
    </div>
  );
};
