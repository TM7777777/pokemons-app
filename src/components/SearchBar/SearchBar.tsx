import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import { useAppSelector } from '../../store/hooks';
import { getListData } from '../../store/cardListSlice/selectors';
import { Pokemon } from '../../types';
import styles from './SearchBar.module.scss';

const SearchBar = (): JSX.Element => {
  const [inputSearch, setInputSearch] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const listData = useAppSelector(getListData);

  const onSearch = (term: string) => {
    setInputSearch(term);
    const filteredResults = listData.filter((item) =>
      item?.name.toLowerCase().includes(term.toLowerCase()),
    );
    setSearchResults(filteredResults);
  };

  return (
    <div className={styles['search-wrap']}>
      <Input
        type="text"
        value={inputSearch}
        placeholder="Find your Pokemon"
        onChange={(e) => onSearch(e.target.value)}
        allowClear
      />

      {searchResults.length > 0 && inputSearch && (
        <div className={styles['results-wrap']}>
          {searchResults.map((item) => (
            <div key={item.id}>
              <Link to={`/${item.id}`}>{item.name}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
