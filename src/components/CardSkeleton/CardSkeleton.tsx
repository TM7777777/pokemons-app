import styles from './CardSkeleton.module.scss';

const CardSkeleton = (): JSX.Element => {
  return (
    <div className={styles['skeleton-card']}>
      <div className={styles['skeleton-card__image']}></div>
      <div className={styles['skeleton-card__title']}></div>
      <div className={styles['skeleton-card__tags']}>
        <div className={styles['skeleton-card__tag']}></div>
        <div className={styles['skeleton-card__tag']}></div>
        <div className={styles['skeleton-card__tag']}></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
