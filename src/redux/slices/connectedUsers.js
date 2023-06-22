import { createSlice } from "@reduxjs/toolkit";

const connectedUsersSlice = createSlice({
    name: 'connectedUsers',
    initialState: {
        connectedUsers: []
    },
    reducers: {
        setUsers(state, action) {
            state.connectedUsers = action.payload;
        },
        addUser(state, action) {
            state.connectedUsers.push(action.payload);
        },
        removeUser(state, action) {
            state.connectedUsers = state.connectedUsers.filter(user => user.userId !== action.payload);
        }
    }
});

export default connectedUsersSlice;