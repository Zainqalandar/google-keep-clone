import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from '@/appwrite/BlogService';
import { Query } from 'appwrite'; // Import Query from the Appwrite SDK

const initialState = {
	publish: {
		blogs: [],
		loading: true,
		error: null,
	},
	archive: {
		blogs: [],
		loading: true,
		error: null,
	},
	bin : {
		blogs: [],
		loading: true,
		error: null,
	},
	personalBlogs: {
		blogs: [],
		loading: false,
		error: null,
	}
};

export const fetchPersonalBlogs = createAsyncThunk(
	'featureBlogs/fetchPersonalBlogs',
	async (authId, { rejectWithValue }) => {
		try {
			let queries = [Query.equal('authorId', authId)];
			const response = await blogService.getPersonalBlogs(queries);
			return response.documents;
		} catch (error) {
			console.log('Error fetching my-blogs', error);
			return rejectWithValue(error.message);
		}
	}
);


export const fetchPublishBlogs = createAsyncThunk(
    'featureBlogs/fetchPublishBlogs',
    async (authId = null, { rejectWithValue }) => {
        try {
            let queries = [Query.equal('is_archived', false), Query.equal('is_deleted', false)];
            if (authId) {
                queries.push(Query.equal('authorId', authId));
            }
            const response = await blogService.getBlogs(queries);
            return response.documents;
        } catch (error) {
            console.log('Error fetching my-blogs', error);
            return rejectWithValue(error.message);
        }
    }
);

export const fetchArchiveBlogs = createAsyncThunk(
	'featureBlogs/fetchArchiveBlogs',
	async (authId = null, { rejectWithValue }) => {
		try {
			let queries = [Query.equal('is_archived', true), Query.equal('is_deleted', false)]
			if (authId) {
                queries.push(Query.equal('authorId', authId));
            }
			const response = await blogService.getBlogs(queries);
			return response.documents;
		} catch (error) {
			console.log('Error fetching my-blogs', error);
			return rejectWithValue(error.message);
		}
	}
);

export const fetchBinBlogs = createAsyncThunk(
	'featureBlogs/fetchBinBlogs',
	async (authId = null, { rejectWithValue }) => {
		let queries = [Query.equal('is_archived', false), Query.equal('is_deleted', true)]
		if (authId) {
			queries.push(Query.equal('authorId', authId));
		}
		try {
			// const response = await blogService.getBinBlogs(queries);
			const response = await blogService.getBlogs(queries);
			return response.documents;
		} catch (error) {
			console.log('Error fetching my-blogs', error.message);
			return rejectWithValue(error.message);
		}
	}
);

const featureBlogsSlice = createSlice({
	name: 'featureBlogs',
	initialState,
	reducers: {},
	extraReducers: (builder) => {

		builder
			.addCase(fetchPublishBlogs.pending, (state) => {
				state.publish.loading = true;
				state.publish.error = null;
			})
			.addCase(fetchPublishBlogs.fulfilled, (state, action) => {
				state.publish.loading = false;
				state.publish.blogs = action.payload;
			})
			.addCase(fetchPublishBlogs.rejected, (state, action) => {
				state.publish.loading = false;
				state.publish.error = action.payload;
			});

		builder
			.addCase(fetchArchiveBlogs.pending, (state) => {
				state.archive.loading = true;
				state.archive.error = null;
			})
			.addCase(fetchArchiveBlogs.fulfilled, (state, action) => {
				state.archive.loading = false;
				state.archive.blogs = action.payload;
			})
			.addCase(fetchArchiveBlogs.rejected, (state, action) => {
				state.archive.loading = false;
				state.archive.error = action.payload;
			});

			builder
			.addCase(fetchBinBlogs.pending, (state) => {
				state.bin.loading = true;
				state.bin.error = null;
			})
			.addCase(fetchBinBlogs.fulfilled, (state, action) => {
				state.bin.loading = false;
				state.bin.blogs = action.payload;
			})
			.addCase(fetchBinBlogs.rejected, (state, action) => {
				console.log('error dfdf', action.payload)
				state.bin.loading = false;
				state.bin.error = action.payload;
			}
		);

		builder
			.addCase(fetchPersonalBlogs.pending, (state) => {
				state.personalBlogs.loading = true;
				state.personalBlogs.error = null;
			})
			.addCase(fetchPersonalBlogs.fulfilled, (state, action) => {
				state.personalBlogs.loading = false;
				state.personalBlogs.blogs = action.payload;
			})
			.addCase(fetchPersonalBlogs.rejected, (state, action) => {
				state.personalBlogs.loading = false;
				state.personalBlogs.error = action.payload;
			});
	},
});

export default featureBlogsSlice.reducer;
