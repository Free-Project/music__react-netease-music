export const DEFAULT_VALUE = {
  ARRAY: '[]',
  OBJECT: '{}',
  STRING: '',
};

interface Type_LocalStorageFactoryParams<T> {
  key: string;
  defaultValue: string;
  raw?: boolean;
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

interface Type_LocalStorageFactoryReturn<T> {
  setItem: (value: T) => void;
  getItem: () => T;
  removeItem: () => void;
}

export const localStorageFactory = <T>(
  params: Type_LocalStorageFactoryParams<T>,
): Type_LocalStorageFactoryReturn<T> => {
  const {
    key,
    defaultValue,
    raw,
    serializer = JSON.stringify,
    deserializer = JSON.parse,
  } = params;

  const setItem = (value: T) => {
    const data = (raw ? value : serializer(value)) as string;
    window.localStorage.setItem(key, data || defaultValue);
  };

  const getItem = () => {
    const data = window.localStorage.getItem(key) || defaultValue;
    return raw ? data : deserializer(data);
  };

  const removeItem = () => window.localStorage.removeItem(key);

  return {
    setItem,
    getItem,
    removeItem,
  };
};
