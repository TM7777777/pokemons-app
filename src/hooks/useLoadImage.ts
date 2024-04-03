import axios from 'axios';
import { useEffect, useState } from 'react';
import Load from '../assets/load.gif';

const cache = new Map<string, string>();

const loadImage = (url: string) =>
  axios.get(url, { responseType: 'blob' }).then((response) => {
    const blob = response.data;

    const src = URL.createObjectURL(blob);

    cache.set(url, src);

    return src;
  });

export const useLoadImage = (url: string, defaultValue = Load) => {
  const [imgSrc, setImgSrc] = useState<string>(defaultValue);

  useEffect(() => {
    if (cache.has(url)) {
      setImgSrc(cache.get(url)!);
    } else {
      loadImage(url).then(setImgSrc);
    }
  }, [imgSrc, url]);

  return imgSrc;
};
