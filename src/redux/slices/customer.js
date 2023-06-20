import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        customers: null,
        customerData: null,
    },
    reducers: {
        setCustomers(state, action) {
            state.customers = action.payload;
        },
        updateCustomer(state, action) {
            state.customerData = action.payload;
        },
        setCustomerData(state, action) {
            state.customerData = action.payload;
        },
        changeCustomerState(state, action) {
            state.customerData = action.payload;
        },
        deleteCustomer(state, action) {
            const index = state.customers.findIndex(customer => customer._id === action.payload._id);
            state.customers.splice(index, 1);
        }
    }
});

export default customerSlice;