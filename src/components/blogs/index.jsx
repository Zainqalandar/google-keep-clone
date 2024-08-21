'use client';
import React, { useEffect } from 'react';
import { fetchPublishBlogs } from '@/store/featureBlogs';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname } from 'next/navigation';
import {
	Box,
	Heading,
	Text,
	Image,
	VStack,
	HStack,
	Avatar,
	Divider,
	Link,
	useColorModeValue,
	Badge,
} from '@chakra-ui/react';
import blogService from '@/appwrite/BlogService';
import {
	formatDate,
	getColorFromId,
	getNameFromEmail,
	getTimeSinceCreation,
} from '@/lib/utils/resuseableFunctions';
import MenuButtons from './menu-btns';
import BlogSkeleton from './blog-skeleton';
import RelatedPosts from './related-posts';
import EmptyBlog from "@/components/blogs/empty-blog";

const Blogs = () => {
	const bgColor = useColorModeValue('white', 'gray.800');
	const textColor = useColorModeValue('gray.700', 'gray.200');
	const accentColor = useColorModeValue('purple.600', 'purple.400');
	const personalPath = usePathname()


	// const { blogs, loading, error } = useSelector((state) => state.publish);
	const State = useSelector((state) => state);

	const dispatch = useDispatch();

	let isPersonal = personalPath === '/blog'

	// let userId = isPersonal ? user.userData?.$id : null
	// useEffect(() => {

	// 	console.log('personalPath', personalPath)
	// 	dispatch(fetchBlogs(userId));
	// }, [dispatch]);
	
	useEffect(() => {
		dispatch(fetchPublishBlogs());
	}, [dispatch]);


	// console.log('loading :: blogs', loading);
	// console.log('blogs :: blogs', blogs);
	console.log('State :: blogs', State);

	return (
		<Box
			bg={bgColor}
			p={8}
			borderradius="md"
			boxShadow="xl"
			maxW="1200px"
			mx="auto"
			my={10}
		>
			blogs
		</Box>
	);
};

export default Blogs;
