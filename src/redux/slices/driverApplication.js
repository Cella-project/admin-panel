import { createSlice } from "@reduxjs/toolkit";

const driverApplicationSlice = createSlice({
    name: 'driverApplication',
    initialState: {
        driverApplications: null,
        driverApplicationData: null,
    },
    reducers: {
        setDriverApplications(state, action) {
            state.driverApplications = action.payload;
        },
        updateDriverApplication(state, action) {
            state.driverApplicationData = action.payload;
        },
        setDriverApplicationData(state, action) {
            state.driverApplicationData = action.payload;
        },
        approveDriverApplication(state, action) {
            state.driverApplicationData = action.payload;
        },
        rejectDriverApplication(state, action) {
            state.driverApplicationData = action.payload;
        },
        deleteDriverApplication(state, action) {
            const index = state.driverApplications.findIndex(driverApplication => driverApplication._id === action.payload._id);
            state.driverApplications.splice(index, 1);
        }
    }
});

export default driverApplicationSlice;