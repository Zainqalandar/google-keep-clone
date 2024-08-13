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
    async (_, { rejectWithValue }) => {
        try {
            const response = await blogService.getBlogs();
            console.log("response", response.documents);
            return response.documents;
        } catch (error) {
            return rejectWithValue(error.response.data);
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
                console.log("action.payload", action);
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