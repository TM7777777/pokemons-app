import { fireEvent } from '@testing-library/react';
import { renderWithStore } from '../src/utils/renderWithStore';
import SearchBar from '../src/components/SearchBar';
import { RootState } from '../src/store';

const preloadedState = {
  list: {
    data: [
      { id: 1, name: 'bulbasaur' },
      { id: 2, name: 'ivysaur' },
      { id: 3, name: 'venusaur' },
    ],
    typeData: [
      { id: 1, name: 'grass' },
      { id: 2, name: 'fire' },
    ],
  },
} as RootState;

describe('SearchBar', () => {
  it('renders search input and shows results', () => {
    const { getByPlaceholderText, getByText } = renderWithStore(
      <SearchBar />,
      preloadedState,
      '/',
    );

    const inputElement = getByPlaceholderText('Find your Pokemon');
    fireEvent.change(inputElement, { target: { value: 'Bulb' } });

    const linkElement = getByText('bulbasaur');
    expect(linkElement).toBeInTheDocument();
  });
});
