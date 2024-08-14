import { configureStore } from '@reduxjs/toolkit';
import featureBlogsSlice from './featureBlogs/index';
import featureUserSlice from './feature-user/index'

export const store = configureStore({
	reducer: {
		blog: featureBlogsSlice,
		user: featureUserSlice,
	},
});
