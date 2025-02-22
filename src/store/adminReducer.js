import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentAdmin: null,
    error: null,
    loading: false,
}

const adminReducer = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminSigninStart: (state) => {
            state.loading = true;
        },
        adminSigninSuccess: (state, action) => {
            state.currentAdmin = action.payload;
            state.loading = false;
            state.error = null;
        },
        adminSigninFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOutUserStart: (state) => {
            state.loading = true;
        },
        signOutUserSuccess: (state) => {
            state.currentUser = null;  // Reset currentUser on sign out
            state.loading = false;
            state.error = null;
        },
        signOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
});

export const { adminSigninStart, adminSigninSuccess, adminSigninFailure,
    signOutUserStart, signOutUserSuccess, signOutUserFailure
} = adminReducer.actions;

export default adminReducer.reducer;