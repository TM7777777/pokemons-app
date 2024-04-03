import CardItem from '../src/components/CardItem';
import { RootState } from '../src/store';
import { Pokemon } from '../src/types';
import { renderWithStore } from '../src/utils/renderWithStore';

const mockInitialState = {
  list: {
    data: [
      { id: 1, name: 'Bulbasaur', types: [{ type: { name: 'grass', url: '1' } }] },
      { id: 2, name: 'Ivysaur', types: [{ type: { name: 'fire' } }] },
    ],
    selectedCardId: 1,
    selectedTypeIds: [1],
  },
} as RootState;

describe('CardItem', () => {
  it('renders without crashing', () => {
    const pokemon = {
      id: 1,
      name: 'Bulbasaur',
      types: [{ type: { name: 'grass' } }],
    } as Pokemon;

    const { getByText } = renderWithStore(
      <CardItem data={pokemon} />,
      mockInitialState,
      '/',
    );

    expect(getByText('Bulbasaur')).toBeInTheDocument();
  });
});
