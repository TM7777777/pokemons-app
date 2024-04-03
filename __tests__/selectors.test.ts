import { RootState } from '../src/store';
import * as selectors from '../src/store/cardListSlice/selectors';

const initialState = {
  list: {
    count: 2,
    next: 'http://example.com/next',
    data: [
      {
        id: 1,
        name: 'Bulbasaur',
        types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
      },
      {
        id: 2,
        name: 'Ivysaur',
        types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
      },
    ],
    typeData: [
      { id: 1, name: 'grass' },
      { id: 2, name: 'poison' },
    ],
    selectedCardId: 1,
    selectedTypeIds: [1],
    status: 'loading',
    typeStatus: 'idle',
  },
} as RootState;

describe('getListData selector', () => {
  it('returns the list data', () => {
    const result = selectors.getListData(initialState);
    expect(result).toEqual(initialState.list.data);
  });
});

describe('getTypeData selector', () => {
  it('returns the type data', () => {
    const result = selectors.getTypeData(initialState);
    expect(result).toEqual(initialState.list.typeData);
  });
});

describe('getChosenCardId selector', () => {
  it('returns the chosen card id', () => {
    const result = selectors.getChosenCardId(initialState);
    expect(result).toEqual(initialState.list.selectedCardId);
  });
});

describe('getChosenTypeIds selector', () => {
  it('returns the chosen type ids', () => {
    const result = selectors.getChosenTypeIds(initialState);
    expect(result).toEqual(initialState.list.selectedTypeIds);
  });
});

describe('getChosenCardData selector', () => {
  it('returns the chosen card data', () => {
    const result = selectors.getChosenCardData(initialState);
    expect(result).toEqual(
      initialState.list.data.find((item) => item.id === initialState.list.selectedCardId),
    );
  });
});

describe('getIsListLoading selector', () => {
  it('returns true if list is loading', () => {
    const result = selectors.getIsListLoading(initialState);
    expect(result).toEqual(true);
  });
  it('returns false if list is not loading', () => {
    const modifiedState = {
      ...initialState,
      list: { ...initialState.list, status: 'idle' },
    } as RootState;
    const result = selectors.getIsListLoading(modifiedState);
    expect(result).toEqual(false);
  });
});

describe('getIsListLoading selector', () => {
  it('returns true if list is loading', () => {
    const result = selectors.getIsListLoading(initialState);
    expect(result).toEqual(true);
  });
  it('returns false if list is not loading', () => {
    const modifiedState = {
      ...initialState,
      list: { ...initialState.list, status: 'idle' },
    } as RootState;
    const result = selectors.getIsListLoading(modifiedState);
    expect(result).toEqual(false);
  });
});
