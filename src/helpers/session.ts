import { DEFAULT_VALUE, localStorageFactory } from './localStorage';
import { Type_LoginResult } from 'apis/types/auth';

const KEY = '__session';

export const sessionLocalStorage = localStorageFactory<Type_LoginResult>({
  key: KEY,
  defaultValue: DEFAULT_VALUE.OBJECT,
});
