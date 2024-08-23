'use client';

import { useEffect } from 'react';
import Blogs from '../blogs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBinBlogs } from '@/store/featureBlogs';
import EmptyBlog from '../blogs/empty-blog';

const Bin = () => {
	const { loading, error, blogs } = useSelector((state) => state.blog.bin);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchBinBlogs());
	}, [dispatch]);

	console.log('error', error);
	return (
		<>
			<Blogs blogs={blogs} loading={loading} error={error} />
		</>
	);
};

export default Bin;
