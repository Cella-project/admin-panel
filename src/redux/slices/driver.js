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
        driverConnected(state, action) {
            if (state.drivers !== null) {
                const index = state.drivers.findIndex(el => el._id === action.payload.userId);
                if (state.drivers[index]) {
                    state.drivers[index].connected = true;
                }
            }
        },
        driverDisconnected(state, action) {
            if (state.drivers !== null) {
                const index = state.drivers.findIndex(el => el._id === action.payload);
                if (state.drivers[index]) {
                    state.drivers[index].connected = false;
                }
            }
        },
        addDriver(state, action) {
            if (state.drivers === null) {
                state.drivers = [];
            }
            state.drivers.push({
                ...action.payload,
                connected: false
            });
        },
        setDriverData(state, action) {
            state.driverData = action.payload;
        },
        deleteDriver(state, action) {
            const index = state.drivers.findIndex(driver => driver._id === action.payload._id);
            state.drivers.splice(index, 1);
        }
    }
});

export default driverSlice;