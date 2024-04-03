import { Outlet } from 'react-router-dom';
import CardList from '../../components/CardList';
import TypeFilter from '../../components/TypeFilter';
import SearchBar from '../../components/SearchBar';
import styles from './Main.module.scss';

const MainPage = () => (
  <main className={styles['main-page']}>
    <h1 className={styles['main-page__title']}>Pokemons</h1>
    <SearchBar />
    <div className={styles['main-page__content']}>
      <TypeFilter />
      <CardList />
      <Outlet />
    </div>
  </main>
);

export default MainPage;
