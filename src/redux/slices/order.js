import {createSlice} from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: null,
        orderData:null

    },
    reducers: {
        setOrder(state, action) {
            state.orders = action.payload;
        },
        setOrderData(state, action) {
            state.orderData = action.payload;
        },
        deleteOrder(state, action) {
            const index = state.orders.findIndex(order => order._id === action.payload._id);
            state.orders.splice(index, 1);
        }
    }
});

export default orderSlice;

