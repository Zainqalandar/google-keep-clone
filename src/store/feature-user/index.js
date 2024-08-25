import authService from "@/appwrite/auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import nookies from 'nookies';

const initialState = {
    userData: {},
    loading: true,
    isActive: false,
};

export const fetchUserDetail = createAsyncThunk(
    "featureUser/fetchUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await authService.getCurrentUser();
            console.log('response', response)
            if (response && response.$id) {
                nookies.set(null, 'userId', response.$id, { path: '/' });
            }
            return response
        } catch (error) {
            console.log("Error fetching UserDetails", error);
            nookies.destroy(null, 'userId', { path: '/' });
            return rejectWithValue(error);
        }
    }
);



const featureUserSlice = createSlice({
    name: "featureUser",
    initialState,
    reducers: {
        getUserDetail: (state, action) => {
            state.userData = action.payload;
            if (action.payload?.$id) {
                state.isActive = true;   
            }else {
                state.isActive = false;
            }
        },

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetail.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.isActive = true;
                state.userData = action.payload;
            })
            .addCase(fetchUserDetail.rejected, (state) => {
                state.loading = false;
                state.isActive = false;
            });
    },
});

export const { getUserDetail } = featureUserSlice.actions;

export default featureUserSlice.reducer;