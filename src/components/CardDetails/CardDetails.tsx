import { useState, useLayoutEffect } from 'react';
import { Affix, Card } from 'antd';
import { CSSTransition } from 'react-transition-group';
import { useAppSelector } from '../../store/hooks';
import { getChosenCardData } from '../../store/cardListSlice/selectors';
import PropertyTable from '../PropertyTable';
import styles from './CardDetails.module.scss';
import { useLoadImage } from '../../hooks/useLoadImage';
import { getImageUrl } from '../../utils';
import MovesTable from '../MovesTable';

const CardDetails = (): JSX.Element => {
  const [inProp, setInProp] = useState(false);
  const data = useAppSelector(getChosenCardData);
  const imgSrc = useLoadImage(data?.id ? getImageUrl(data.id) : '');

  useLayoutEffect(() => {
    setInProp(true);

    return () => {
      setInProp(false);
    };
  }, []);

  if (!data) {
    return <></>;
  }

  const { id, name, types, stats } = data;

  const typesList = types.map((item) => ({
    name: 'type',
    value: item.type.name,
  }));

  const featuresList = stats.map((item) => ({
    name: item.stat.name,
    value: item.base_stat,
  }));

  return (
    <CSSTransition
      in={inProp}
      timeout={500}
      classNames={{
        enter: styles['card-details__enter'],
        enterActive: styles['card-details__enter-active'],
      }}
    >
      <Affix className={styles['card-affix']} offsetTop={0}>
        <Card
          className={styles['card-details']}
          cover={<img className={styles['card-img']} alt={name} src={imgSrc} />}
          styles={{ body: { padding: '16px' } }}
        >
          <div className={styles['card-details__title']}>
            {`${name} Details #${String(id).padStart(3, '0')}`}
          </div>
          <div className={styles['card-details__tags']}>
            <h2>Stats:</h2>
            <PropertyTable data={[...typesList, ...featuresList]} />
          </div>
          <MovesTable />
        </Card>
      </Affix>
    </CSSTransition>
  );
};

export default CardDetails;
