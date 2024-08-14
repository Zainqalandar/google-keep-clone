'use client';
import React, { useEffect, useState } from 'react';
import { fetchBlogs } from '@/store/featureBlogs';
import { useDispatch, useSelector } from 'react-redux';
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
	useStatStyles,
} from '@chakra-ui/react';
import blogService from '@/appwrite/BlogService';
import { formatDate, getColorFromId, getNameFromEmail } from '@/lib/utils/resuseableFunctions';
import BlogSkeleton from '../ui/BlogSkeleton';

const Blogs = () => {
	const bgColor = useColorModeValue('white', 'gray.800');
	const textColor = useColorModeValue('gray.700', 'gray.200');
	const accentColor = useColorModeValue('purple.600', 'purple.400');

	const dispatch = useDispatch();
	const { blogs, error, loading } = useSelector((state) => state.blog);

	console.log('loading', loading)

	useEffect(() => {
		dispatch(fetchBlogs());
	}, [dispatch]);




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
			{loading ? (
				<BlogSkeleton />
			) : (
				<>
					{blogs
						?.map((blog, index) => (
							<div key={index}>
								<VStack spacing={6} align="start">
									<Image
										src={blogService.getBlogFile(
											blog?.coverImageId
										)}
										alt="Blog image"
										borderradius="md"
										w="full"
										h="400px"
										objectFit="cover"
										unoptimized="true"
									/>
									<Heading size="2xl" color={accentColor}>
										{blog?.title}
									</Heading>
									<HStack spacing={4}>
										<Avatar
											src="/zain.qalandar.jpg"
											name={getNameFromEmail(blog?.name)}
											size="md"
											bg={getColorFromId(blog?.authorId)}
										/>
										<VStack align="start" spacing={0}>
											<Text
												fontWeight="bold"
												color={textColor}
											>
												{blog?.name}
											</Text>
											<Text
												fontSize="sm"
												color={textColor}
											>
												{formatDate(blog?.$createdAt)}
											</Text>
										</VStack>
									</HStack>
								</VStack>

								<Divider my={6} />

								{/* Blog Content */}
								<VStack spacing={4} align="start">
									<Text
										dangerouslySetInnerHTML={{
											__html: blog?.content,
										}}
										fontSize="lg"
										color={textColor}
									/>

									<Link
										color={accentColor}
										fontWeight="bold"
										href="#"
									>
										Read more
									</Link>
								</VStack>

								<Divider my={6} />
							</div>
						))
						.reverse()}
				</>
			)}
		</Box>
	);
};

export default Blogs;
