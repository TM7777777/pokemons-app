import { fireEvent } from '@testing-library/react';
import TypeFilter from '../src/components/TypeFilter';
import { renderWithStore } from '../src/utils/renderWithStore';
import { RootState } from '../src/store';

describe('TypeFilter', () => {
  it('correctly changes selected types on change', async () => {
    const preloadedState = {
      list: {
        typeData: [
          { id: 1, name: 'grass' },
          { id: 2, name: 'fire' },
        ],
        selectedTypeIds: [1],
      },
    } as RootState;

    const { getByRole, getAllByRole } = renderWithStore(
      <TypeFilter />,
      preloadedState,
      '/',
    );

    fireEvent.mouseDown(getByRole('combobox'));

    const options = getAllByRole('option');
    fireEvent.click(options[0]);

    const { selectedTypeIds } = preloadedState.list;
    expect(selectedTypeIds).toEqual([1]);
  });
});
