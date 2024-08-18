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
	Badge,
	MenuButton,
	MenuList,
	MenuItem,
	Menu,
	IconButton,
} from '@chakra-ui/react';
import blogService from '@/appwrite/BlogService';
import {
	formatDate,
	getColorFromId,
	getNameFromEmail,
	getTimeSinceCreation,
} from '@/lib/utils/resuseableFunctions';
import BlogSkeleton from './BlogSkeleton';
import { FiEdit, FiCopy, FiTrash } from 'react-icons/fi';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import ConfirmationDeletePopup from './ConfirmationDeletePopup';
import { useNotification } from '@/lib/provider/context/NotificationProvider';
import { useRouter } from 'next/navigation';

const MegaBlog = () => {
	const bgColor = useColorModeValue('white', 'gray.800');
	const textColor = useColorModeValue('gray.700', 'gray.200');
	const accentColor = useColorModeValue('purple.600', 'purple.400');
	const router = useRouter();

	const { blogs, loading } = useSelector((state) => state.blog);

	const notify = useNotification();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchBlogs());
	}, [dispatch]);

	const handleDelete = async (blogId, blogFileId) => {
		try {
			await blogService.deleteBlog(blogId);
			await blogService.deleteBlogFile(blogFileId);
			notify('Blog deleted successfully', 'success');
			dispatch(fetchBlogs());
		} catch (error) {
			console.log('MegaBlog :: handleDelete :: error', error);
			notify('Error deleting blog', 'error');
		}
	};

	console.log('MegaBlog :: blogs', blogs);

	return (
		<>
			<Box
				bg={bgColor}
				p={8}
				borderradius="md"
				boxShadow="xl"
				maxW="1200px"
				mx="auto"
				my={10}
			>
				{/* Blog Header */}
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
										<HStack
											spacing={4}
											w="full"
											justify="space-between"
										>
											<HStack spacing={4}>
												<Avatar
													src="/zain.qalandar.jpg"
													name={getNameFromEmail(
														blog?.name
													)}
													size="md"
													bg={getColorFromId(
														blog?.authorId
													)}
												/>

												<VStack
													align="start"
													spacing={0}
												>
													<Text
														fontWeight="bold"
														color={textColor}
													>
														{blog?.name}
														{getTimeSinceCreation(
															blog?.$createdAt
														).isNew && (
															<Badge
																ml="3"
																colorScheme="green"
															>
																New
															</Badge>
														)}
													</Text>
													<Text
														fontSize="sm"
														color={textColor}
													>
														{formatDate(
															blog?.$createdAt
														)}
														{getTimeSinceCreation(
															blog?.$createdAt
														).isNew && (
															<Text
																as="span"
																ml="2"
															>
																{
																	getTimeSinceCreation(
																		blog?.$createdAt
																	).timeString
																}
															</Text>
														)}
													</Text>
												</VStack>
											</HStack>
											{/* Dropdown Menu */}
											<Menu>
												<MenuButton
													as={IconButton}
													icon={
														<BiDotsHorizontalRounded />
													}
													variant="ghost"
													aria-label="Options"
												/>
												<MenuList>
													{/* <MenuItem icon={<FiEdit />}>
														<Link w='100%' h='100%' href={`/edit/${blog?.$collectionId}`}>
															Edit
														</Link>
													</MenuItem> */}
													<MenuItem onClick={() => router.push(`/edit/${blog?.$id}`)} icon={<FiEdit />}>
														Edit
													</MenuItem>
													<MenuItem icon={<FiCopy />}>
														Duplicate
													</MenuItem>
													<ConfirmationDeletePopup
														blogId={blog?.$id}
														blogFileId={
															blog?.coverImageId
														}
														onHandleDelete={
															handleDelete
														}
													/>
												</MenuList>
											</Menu>
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

				{/* Related Posts */}
				<Heading size="lg" mb={4} color={accentColor}>
					Related Posts
				</Heading>
				<HStack spacing={4} overflowX="auto">
					{[1, 2, 3].map((post) => (
						<Box key={post} w="300px">
							<Image
								src={`/zain-qalandar.jpg`}
								alt="Related post image"
								borderradius="md"
								objectFit="cover"
							/>
							<Text
								fontSize="md"
								mt={2}
								fontWeight="bold"
								color={textColor}
								noOfLines={2}
							>
								How to Refactor Your Code for Better Readability
							</Text>
						</Box>
					))}
				</HStack>
			</Box>
		</>
	);
};

export default MegaBlog;
