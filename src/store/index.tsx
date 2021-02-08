import React from 'react';
import authReducer, {defaultAuth} from './auth/authSlice';
import cardsReducer, {defaultCards} from './cards/cardsSlice';
import commentsReducer, {defaultComments} from './comments/commentsSlice';
import columnsReducer, {defaultColumns} from './columns/columnsSlice';
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {PersistGate} from 'redux-persist/integration/react';

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

const persistedReducer = persistReducer(
  {key: 'root', storage: AsyncStorage},
  rootReducer,
);

export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();

const StoreProvider = ({children}: IStoreProps) => {
  const store = configureStore({
    reducer: persistedReducer,
    preloadedState: defaultState,
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST'],
        },
      }),
      sagaMiddleware,
    ],
  });

  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
