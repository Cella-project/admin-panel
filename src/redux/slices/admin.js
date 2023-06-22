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
        userConnected(state, action) {
            if (state.admins !== null) {
                const index = state.admins.findIndex(el => el._id === action.payload.userId);
                if (state.admins[index]) {
                    state.admins[index].connected = true;
                }
            }
        },
        userDisconnected(state, action) {
            if (state.admins !== null) {
                const index = state.admins.findIndex(el => el._id === action.payload);
                if (state.admins[index]) {
                    state.admins[index].connected = false;
                }
            }
        },
        addAdmin(state, action) {
            if (state.admins === null) {
                state.admins = [];
            }
            state.admins.push({
                ...action.payload,
                connected: false
            });
        },
    }
});

export default adminSlice;