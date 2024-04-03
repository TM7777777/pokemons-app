import { useMemo } from 'react';
import { Select } from 'antd';
import { compose, map, unary } from 'ramda';

import { getChosenTypeIds, getTypeData } from '../../store/cardListSlice/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTypes } from '../../store/cardListSlice';

import styles from './TypeFilter.module.scss';

const TypeFilter = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const typeData = useAppSelector(getTypeData);
  const selectedTypeIds = useAppSelector(getChosenTypeIds);

  const typeSelectOptions = useMemo(
    () =>
      typeData.map((item) => ({
        label: item.name,
        value: item.id.toString(),
      })),
    [typeData],
  );

  const handleChange = compose(dispatch, selectTypes, map(unary(parseInt)));

  return (
    <div className={styles['type-filter']}>
      <Select
        className={styles['type-filter__select']}
        mode="multiple"
        size="middle"
        optionFilterProp="label"
        virtual={false}
        allowClear
        placeholder="Filter pokemons by type"
        onChange={handleChange}
        options={typeSelectOptions}
        value={selectedTypeIds.map((id) => id.toString())}
      />
    </div>
  );
};

export default TypeFilter;
