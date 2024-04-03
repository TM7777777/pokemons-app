import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import cardListSliceReducer from '../store/cardListSlice';
import { RootState } from '../store';

export const renderWithStore = (
  component: React.ReactElement,
  initialState: RootState,
  path?: string,
  initialEntries?: string,
) => {
  const testStore = configureStore({
    reducer: {
      list: cardListSliceReducer,
    },
    preloadedState: initialState,
  });

  const ReduxRouterWrapper = ({ children }: React.PropsWithChildren<{}>) => {
    return (
      <Provider store={testStore}>
        <MemoryRouter initialEntries={[initialEntries || '']}>
          <Routes>
            <Route path={path} element={children} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  return render(component, {
    wrapper: ReduxRouterWrapper,
  });
};
