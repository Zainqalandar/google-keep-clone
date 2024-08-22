'use client';
import EmptyBlog from '@/components/blogs/empty-blog';
import { fetchArchiveBlogs } from '@/store/featureBlogs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blogs from '../blogs';

const Archive = () => {
	const {loading, error, blogs} = useSelector((state) => state.blog.archive);


    const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchArchiveBlogs());
	}, [dispatch]);

	return (
		<>
        <Blogs blogs={blogs} loading={loading} error={error} />
			<EmptyBlog type='archive' text='No Archive Blogs Available' />
		</>
	);
};

export default Archive;
