import { memo, useMemo, useCallback } from 'react';
import cn from 'classnames';
import CardItem from '../CardItem';
import CardSkeleton from '../CardSkeleton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getChosenCardId,
  getFilteredListData,
  getIsListLoading,
} from '../../store/cardListSlice/selectors';
import { fetchCardListAsync } from '../../store/cardListSlice';
import styles from './CardList.module.scss';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

const CardList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const filteredList = useAppSelector(getFilteredListData);
  const selectedId = useAppSelector(getChosenCardId);
  const isListLoading = useAppSelector(getIsListLoading);

  const handleFetchMoreClick = useCallback(() => dispatch(fetchCardListAsync()), []);

  const bottomRef = useInfiniteScroll<HTMLDivElement>({ loadMore: handleFetchMoreClick });

  const filteredListJSX = useMemo(
    () => (
      <div className={styles['card-list__cards']}>
        {filteredList.length > 0 &&
          filteredList.map((item) => <CardItem key={item.id} data={item} />)}
        {isListLoading && [...new Array(6)].map((_, ind) => <CardSkeleton key={ind} />)}
        <div ref={bottomRef} />
      </div>
    ),
    [filteredList, isListLoading],
  );

  return (
    <div
      className={cn(styles['card-list'], { [styles['card-list--compact']]: selectedId })}
    >
      {filteredListJSX}
      {!isListLoading && filteredList.length === 0 && (
        <div className={styles['card-list__empty']}>Your pokemon list is empty!</div>
      )}
    </div>
  );
};

export default memo(CardList);
