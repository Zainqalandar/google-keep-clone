import Blogs from '@/components/blogs';
import { Box } from '@chakra-ui/react';
import React from 'react';

export const metadata = {
	title: 'My Blogs',
	description: 'My Blogs page description',
};

const MyBlogs = () => {
	return (
		<>
			<Box width="80%">
				<Blogs />
			</Box>
		</>
	);
};

export default MyBlogs;
