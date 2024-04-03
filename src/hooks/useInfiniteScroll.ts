import { useState, useRef, useEffect, useCallback, LegacyRef } from 'react';

interface UseInfiniteScrollProps {
  loadMore: () => Promise<any>;
}

export const useInfiniteScroll = <T extends HTMLElement>({
  loadMore,
}: UseInfiniteScrollProps): LegacyRef<T> | undefined => {
  const bottomRef = useRef<T | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const loadMoreHandler = useCallback(() => {
    if (isLoading) return;

    setLoading(true);
    loadMore().finally(() => setLoading(false));
  }, [loadMore, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log('tet');
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          loadMoreHandler();
        }
      },
      { threshold: 1.0 },
    );

    const currentElement = bottomRef.current;
    if (currentElement) observer.observe(currentElement);

    return () => observer.disconnect();
  }, [loadMoreHandler]);

  return bottomRef;
};
