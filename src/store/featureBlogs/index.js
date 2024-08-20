import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "@/appwrite/BlogService";

const initialState = {
    blogs: [],
    loading: false,
    error: null,
};

// Create an async thunk for fetching blogs
export const fetchBlogs = createAsyncThunk(
    "featureBlogs/fetchBlogs",
    async (authId, { rejectWithValue }) => {
        try {
            const response = await blogService.getBlogs(authId);
            return response.documents;
        } catch (error) {
            console.log("Error fetching blogs", error);
            return rejectWithValue(error.message);
        }
    }
);

const featureBlogsSlice = createSlice({
    name: "featureBlogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default featureBlogsSlice.reducer;