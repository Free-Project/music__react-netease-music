import React from 'react';
import { Modal, Input } from '@douyinfe/semi-ui';
import { IconSmartphoneStroked, IconLockStroked } from '@douyinfe/semi-icons';

import authApis from 'apis/auth';
import useAsyncFn from 'hooks/useAsyncFn';
import { noop } from 'helpers/fn';
import { LogDispatchContext, ACTIONS } from 'reducers/log';
import styles from './style.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const { useState, useContext } = React;

const LoginDialog: React.FC<Props> = ({ isOpen, onClose = noop }) => {
  const dispatch = useContext(LogDispatchContext);
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginState, loginFn] = useAsyncFn(authApis.login);
  const { loading, error } = loginState;

  const handleLogin = async () => {
    const result = await loginFn({ phone, password });
    if (result) {
      dispatch({
        type: ACTIONS.LOGIN,
        payload: {
          user: {
            ...result,
            userId: result.profile.userId,
          },
        },
      });
      onClose();
    }
  };

  return (
    <Modal
      title='登录'
      visible={isOpen}
      onOk={handleLogin}
      onCancel={onClose}
      okText={'登录'}
      cancelText={'取消'}
      confirmLoading={loading}
    >
      <div className={styles.content}>
        <Input
          prefix={<IconSmartphoneStroked />}
          placeholder='请输入手机号'
          value={phone}
          onChange={setPhone}
        />
        <Input
          prefix={<IconLockStroked />}
          placeholder='请输入密码'
          type='password'
          value={password}
          onChange={setPassword}
        />
        {error && <div className='error'>{error.message}</div>}
      </div>
    </Modal>
  );
};

export default LoginDialog;
