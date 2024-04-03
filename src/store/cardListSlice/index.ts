import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_POKEMON_LIST_URL } from '../../service/API_URL';
import { fetchListData, fetchTypesData } from '../../service';
import { Pokemon, TypeNormalized } from '../../types';
import { RootState } from '../index';

export type CardListState = {
  count: number | null;
  next: string | null;
  data: Pokemon[];
  typeData: TypeNormalized[];
  selectedCardId: number | null;
  selectedTypeIds: number[];
  status: 'idle' | 'loading' | 'failed';
  typeStatus: 'idle' | 'loading' | 'failed';
};

const initialState: CardListState = {
  count: null,
  next: null,
  data: [],
  typeData: [],
  selectedCardId: null,
  selectedTypeIds: [],
  status: 'idle',
  typeStatus: 'idle',
};

export const fetchCardListAsync = createAsyncThunk(
  'list/fetchCardList',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const url = state.list.next || API_POKEMON_LIST_URL;

    const data = await fetchListData(url);

    if (!data) {
      return rejectWithValue(true);
    }

    return {
      count: data.count,
      next: data.next,
      data: data.results,
      extendExistingData: Boolean(state.list.next),
    };
  },
);

export const fetchTypeListAsync = createAsyncThunk(
  'list/fetchTypeList',
  async (_, { rejectWithValue }) => {
    const data = await fetchTypesData();

    if (!data) {
      return rejectWithValue(true);
    }

    return {
      data: data.results,
    };
  },
);

export const cardListSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    selectCard: (state, action: PayloadAction<number | null>) => {
      state.selectedCardId = action.payload;
    },
    selectTypes: (state, action: PayloadAction<number[]>) => {
      state.selectedTypeIds = action.payload;
    },
    selectTypeFromCard: (state, action: PayloadAction<string>) => {
      const selectedTypeId = state.typeData.find(
        (item) => item.name === action.payload,
      )?.id;

      if (selectedTypeId) {
        state.selectedTypeIds = [selectedTypeId];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCardListAsync.fulfilled, (state, action) => {
        const { count, next, data: newData, extendExistingData } = action.payload;
        state.count = count;
        state.next = next;
        state.data = extendExistingData ? [...state.data, ...newData] : newData;
        state.status = 'idle';
      })
      .addCase(fetchCardListAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchTypeListAsync.pending, (state) => {
        state.typeStatus = 'loading';
      })
      .addCase(fetchTypeListAsync.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.typeData = data.map((item, idx) => ({ id: idx, name: item.name }));
        state.typeStatus = 'idle';
      })
      .addCase(fetchTypeListAsync.rejected, (state) => {
        state.typeStatus = 'failed';
      });
  },
});

export const { selectCard, selectTypes, selectTypeFromCard } = cardListSlice.actions;

export default cardListSlice.reducer;
