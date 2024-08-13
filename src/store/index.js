import { configureStore } from '@reduxjs/toolkit';
import featureBlogsSlice from './featureBlogs/index';

export const store = configureStore({
	reducer: {
		blog: featureBlogsSlice,
	},
});
