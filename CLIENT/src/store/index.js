import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import productsReducer from './reducers/products';
import categoriesReducer from './reducers/categories';
import reviewsReducer from './reducers/reviews';
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import basketReducer from './reducers/basket';

const persistConfig = {
  key: 'root',
  storage,
}


const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    products: productsReducer,
    category: categoriesReducer,
    reviews: reviewsReducer,
    basket: basketReducer,
  },
});

export let persistor = persistStore(store);
