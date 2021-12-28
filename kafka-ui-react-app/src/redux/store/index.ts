import { configureStore } from '@reduxjs/toolkit';
import { RootState } from 'redux/interfaces';
import rootReducer from 'redux/reducers';

export const store = configureStore<RootState>({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
});
