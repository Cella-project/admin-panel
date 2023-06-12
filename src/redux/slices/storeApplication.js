import { createSlice } from "@reduxjs/toolkit";

const storeApplicationSlice = createSlice({
    name: 'storeApplication',
    initialState: {
        storeApplications: null,
        storeApplicationData: null,
    },
    reducers: {
        setStoreApplications(state, action) {
            state.storeApplications = action.payload;
        },
        updateStoreApplication(state, action) {
            state.storeApplicationData = action.payload;
        },
        setStoreApplicationData(state, action) {
            state.storeApplicationData = action.payload;
        },
        approveStoreApplication(state, action) {
            state.storeApplicationData = action.payload;
        },
        rejectStoreApplication(state, action) {
            state.storeApplicationData = action.payload;
        },
        deleteStoreApplication(state, action) {
            const index = state.storeApplications.findIndex(storeApplication => storeApplication._id === action.payload._id);
            state.storeApplications.splice(index, 1);
        }
    }
});

export default storeApplicationSlice;