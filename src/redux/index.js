import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/auth';
import adminSlice from "./slices/admin";
import storeSlice from "./slices/store";
import storeApplicationSlice from './slices/storeApplication';
import specialtieslice from './slices/speciality';
import specialityControlSlice from './slices/specialityControl';
import mainCategorySlice from './slices/mainCategory';
import subCategorySlice from './slices/subCategory';
import orderSlice from './slices/order';
import orderHistorySlice from './slices/orderHistory';
import stickySlice from './slices/sticky';
import popupSlice from './slices/popup';
import driverSlice from './slices/driver';
import driverApplicationSlice from './slices/driverApplication';
import customerSlice from './slices/customer';
import paymentSlice from './slices/payment';
import productSlice from './slices/product';
import themeSlice from './slices/theme';
import connectedUsersSlice from './slices/connectedUsers';

const store = configureStore({
        reducer: {
                auth: authSlice.reducer,
                admin: adminSlice.reducer,
                store: storeSlice.reducer,
                storeApplication: storeApplicationSlice.reducer,
                speciality: specialtieslice.reducer,
                specialityControl: specialityControlSlice.reducer,
                mainCategory: mainCategorySlice.reducer,
                subCategory: subCategorySlice.reducer,
                order: orderSlice.reducer,
                orderHistory: orderHistorySlice.reducer,
                sticky: stickySlice.reducer,
                popup: popupSlice.reducer,
                driver: driverSlice.reducer,
                driverApplication: driverApplicationSlice.reducer,
                customer: customerSlice.reducer,
                payment: paymentSlice.reducer,
                product: productSlice.reducer,
                theme: themeSlice.reducer,
                connectedUsers: connectedUsersSlice.reducer
        }
});

export default store;