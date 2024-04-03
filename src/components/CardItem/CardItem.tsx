import { memo } from 'react';
import { compose } from 'ramda';
import { Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCard, selectTypeFromCard } from '../../store/cardListSlice';
import { Pokemon } from '../../types';
import { getChosenCardId } from '../../store/cardListSlice/selectors';
import { useLoadImage } from '../../hooks/useLoadImage';
import styles from './CardItem.module.scss';
import { getImageUrl } from '../../utils';

interface Props {
  data: Pokemon;
}

const CardItem = ({ data }: Props): JSX.Element => {
  const { id, name, types } = data;

  const dispatch = useAppDispatch();
  const selectedId = useAppSelector(getChosenCardId);
  const imgSrc = useLoadImage(getImageUrl(id));
  const tags = types.map((item) => item.type.name);

  const handleTagClick = compose(dispatch, selectTypeFromCard);

  return (
    <Link
      className={styles['card-link']}
      to={selectedId === id ? '/' : id.toString()}
      onClick={() => {
        if (selectedId === id) dispatch(selectCard(null));
      }}
    >
      <Card
        className={styles['card']}
        cover={<img alt={`${name}`} src={imgSrc} />}
        styles={{ body: { padding: '16px' } }}
      >
        <div className={styles['card__title']}>{name}</div>
        <div className={styles['card__tags']}>
          {tags.map((tag) => (
            <Button
              key={tag}
              type="text"
              className={styles['card__tag']}
              onClick={handleTagClick.bind(null, tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </Card>
    </Link>
  );
};

export default memo(CardItem);
