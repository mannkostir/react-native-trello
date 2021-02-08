import React from 'react';
import authReducer, {defaultAuth} from './auth/authSlice';
import cardsReducer, {defaultCards} from './cards/cardsSlice';
import commentsReducer, {defaultComments} from './comments/commentsSlice';
import columnsReducer, {defaultColumns} from './columns/columnsSlice';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';

const defaultState = {
  cards: defaultCards,
  comments: defaultComments,
  auth: defaultAuth,
  columns: defaultColumns,
};

interface IStoreProps {
  children: JSX.Element | JSX.Element[];
}

const rootReducer = combineReducers({
  cards: cardsReducer,
  comments: commentsReducer,
  auth: authReducer,
  columns: columnsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();

const StoreProvider = ({children}: IStoreProps) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: defaultState,
    middleware: [sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
