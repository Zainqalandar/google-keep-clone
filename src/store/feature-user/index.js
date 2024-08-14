import { createSlice } from "@reduxjs/toolkit";

const cookieFallback = localStorage.getItem("cookieFallback");
const parsedCookieFallback = cookieFallback ? JSON.parse(cookieFallback) : {};

const initialState = {
    UserDetail: Array.isArray(parsedCookieFallback) && parsedCookieFallback.length === 0 ? {} : parsedCookieFallback,
    loading: false,
    isActive: Array.isArray(parsedCookieFallback) && parsedCookieFallback.length === 0 ? false : true,
};



const featureUserSlice = createSlice({
    name: "featureUser",
    initialState,
    reducers: {
        getUserDetail: (state, action) => {
            state.UserDetail = action.payload;
            if (action.payload.userId) {
                state.isActive = true;   
            }else {
                state.isActive = false;
            }
        },

    },
});

export const { getUserDetail } = featureUserSlice.actions;

export default featureUserSlice.reducer;