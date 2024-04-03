import { createSelector } from '@reduxjs/toolkit';
import { prop, compose, equals } from 'ramda';
import { RootState } from '..';
import { Pokemon, Move } from '../../types';

const domainSelector = (state: RootState) => state.list;

export const getListData = createSelector(domainSelector, prop('data'));

export const getTypeData = createSelector(domainSelector, prop('typeData'));

export const getChosenCardId = createSelector(domainSelector, prop('selectedCardId'));

export const getChosenTypeIds = createSelector(domainSelector, prop('selectedTypeIds'));

export const getChosenCardData = createSelector(
  getListData,
  getChosenCardId,
  (data, id) => (id ? data.find((item) => item.id === id) : ({} as Pokemon)),
);

export const getGroupedPokemonMoves = createSelector(getChosenCardData, (data) =>
  data?.moves.reduce<Record<string, Pick<Move['move'], 'name'>[]>>((acc, move) => {
    move.version_group_details.forEach((detail) => {
      const methodName = detail.move_learn_method.name;
      if (!acc[methodName]) {
        acc[methodName] = [];
      }

      const existingMove = acc[methodName].find((m) => m.name === move.move?.name);
      if (!existingMove) {
        acc[methodName].push({ name: move.move.name });
      }
    });
    return acc;
  }, {}),
);

export const getFilteredListData = createSelector(
  getListData,
  getTypeData,
  getChosenTypeIds,
  (listData, typeData, typeIds) => {
    if (typeIds.length === 0) return listData;

    const typeNames = typeIds.map((id) => typeData.find((type) => type.id === id)?.name);

    return listData.filter((item) =>
      item.types.some(({ type }) => typeNames.includes(type.name)),
    );
  },
);

export const getIsListLoading = createSelector(
  domainSelector,
  compose(equals('loading'), prop('status')),
);
