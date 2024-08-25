'use client';
import { fetchArchiveBlogs } from '@/store/featureBlogs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blogs from '../blogs';

const Archive = () => {
	const userDetail = useSelector((state) => state.user.userData);
	const { loading, error, blogs } = useSelector(
		(state) => state.blog.archive
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchArchiveBlogs(userDetail.$id));
	}, [dispatch, userDetail.$id]);

	return (
		<>
			<Blogs
				blogs={blogs}
				loading={loading}
				error={error}
				text="No archive blogs found"
				userId={userDetail.$id}
			/>
		</>
	);
};

export default Archive;
