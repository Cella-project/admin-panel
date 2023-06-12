import { createSlice } from "@reduxjs/toolkit";

const driverSlice = createSlice({
    name: 'driver',
    initialState: {
        drivers: null,
        driverData: null,
    },
    reducers: {
        setDrivers(state, action) {
            state.drivers = action.payload;
        },
        addDriver(state, action) {
            if (state.drivers === null) {
                state.drivers = [];
            }
            state.drivers.push(action.payload);
        },
        updateDriver(state, action) {
            state.driverData = action.payload;
        },
        setDriverData(state, action) {
            state.driverData = action.payload;
        },
        changeDriverState(state, action) {
            state.driverData = action.payload;
        },
        deleteDriver(state, action) {
            const index = state.drivers.findIndex(driver => driver._id === action.payload._id);
            state.drivers.splice(index, 1);
        }
    }
});

export default driverSlice;