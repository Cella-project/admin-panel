import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        admins: null
    },
    reducers: {
        setAdmins(state, action) {
            state.admins = action.payload;
        },
        addAdmin(state, action) {
            if (state.admins === null) {
                state.admins = [];
            }
            state.admins.push(action.payload);
        },
    }
});

export default adminSlice;