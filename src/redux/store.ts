import { configureStore} from '@reduxjs/toolkit'
import { authApi } from './api/authapi';
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    cart: cartReducer ,
    products: productReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;