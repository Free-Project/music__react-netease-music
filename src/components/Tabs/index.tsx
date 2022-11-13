import React from 'react';
import cn from 'classnames';

import { noop } from 'helpers/fn';
import styles from './style.module.css';

interface Type_Tab {
  label?: string;
  key: string;
  renderLabel?: () => React.ReactElement;
  onClick?: (key: string) => void;
}

interface Props {
  tabs: Type_Tab[];
}

const { useState } = React;

const Tabs: React.FC<Props> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs?.[0].key);

  return (
    <div className={styles.root}>
      {tabs.map(({ label, key, renderLabel, onClick = noop }) => {
        return (
          <div
            key={key}
            className={cn(styles.tab, activeTab === key && styles.active)}
            onClick={() => {
              setActiveTab(key);
              onClick(key);
            }}
          >
            {label || (renderLabel && renderLabel())}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
