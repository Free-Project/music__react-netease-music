import React from 'react';
import {
  IconMusic,
  IconVideo,
  IconDownload,
  IconCloud,
  IconLikeHeart,
} from '@douyinfe/semi-icons';
import { useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';

import ROUTES from 'constants/routes';
import styles from './style.module.css';

interface Type_MenuItem {
  icon: any;
  label: string;
  active?: boolean;
  route: string;
}

interface Type_Menu {
  title?: string;
  items: Type_MenuItem[];
}

const MENU: Type_Menu[] = [
  {
    items: [
      {
        icon: <IconMusic />,
        label: '发现音乐',
        route: ROUTES.DISCOVERY,
      },
      {
        icon: <IconVideo />,
        label: '视频',
        route: ROUTES.VIDEOS,
      },
    ],
  },
  {
    title: '我的音乐',
    items: [
      {
        icon: <IconDownload />,
        label: '下载管理',
        route: ROUTES.DOWNLOAD,
      },
      {
        icon: <IconCloud />,
        label: '我的音乐云盘',
        route: ROUTES.CLOUD,
      },
      {
        icon: <IconLikeHeart />,
        label: '我的收藏',
        route: ROUTES.COLLECTION,
      },
    ],
  },
];

const Menus = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const handleMenuItemClick = (route: string) => {
    history.push(route);
  };

  return (
    <>
      {MENU.map(({ title, items }, index) => {
        return (
          <div className={styles.block} key={index}>
            {title && <div className={styles.title}>{title}</div>}
            <div className={styles.tabs}>
              {items.map(({ icon, label, route }) => {
                const isActive =
                  pathname.startsWith(route) ||
                  (pathname === ROUTES.ROOT && route === ROUTES.DISCOVERY);
                return (
                  <div
                    key={label}
                    className={
                      isActive ? cn(styles.tab, styles.active) : styles.tab
                    }
                    onClick={() => handleMenuItemClick(route)}
                  >
                    {icon}
                    {label}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Menus;
