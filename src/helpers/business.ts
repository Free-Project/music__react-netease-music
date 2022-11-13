import type {
  Type_MyMusic,
  Type_Music,
  Type_SimpleMusic,
} from 'apis/types/business';

export const getMusicUrl = (id?: number): string => {
  return id ? `https://music.163.com/song/media/outer/url?id=${id}.mp3` : '';
};

export const createMusic = ({
  id,
  name,
  artists,
  duration,
  picUrl,
  ...others
}: Type_MyMusic): Type_MyMusic => {
  return {
    id,
    name,
    artists,
    duration,
    picUrl,
    ...others,
  };
};

export const createMusicWithAlbum = (music: Type_Music) => {
  const { id, name, artists, album, duration, ...others } = music;
  return {
    id,
    name,
    artists,
    duration,
    picUrl: album.blurPicUrl,
    ...others,
  };
};

export const createMusicFromSimpleMusic = (
  music: Type_SimpleMusic,
): Type_Music => {
  const { id, name, al, ar, dt, fee, status } = music;
  return {
    id,
    name,
    fee,
    status,
    picUrl: al.picUrl,
    artists: ar,
    duration: dt,
    album: al,
  };
};

export const createMyMusicFromSimpleMusic = (
  music: Type_SimpleMusic,
): Type_MyMusic => {
  const { id, name, al, ar, dt, fee, status } = music;
  return {
    id,
    name,
    fee,
    status,
    picUrl: al.picUrl,
    artists: ar,
    duration: dt,
    album: al,
  };
};
