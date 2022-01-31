import md5 from 'md5';

export default function commonHash(message: string | any[]) {
  return md5(message);
}
