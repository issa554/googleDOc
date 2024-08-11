import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import  documentReducer  from '../components/document/documentSlice';
import  documentSaga  from '../components/document/documentSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    document: documentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(documentSaga);

export default store;
