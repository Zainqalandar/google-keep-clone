'use client';

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
import {
	formatDate,
	getColorFromId,
	getNameFromEmail,
	getTimeSinceCreation,
} from '@/lib/utils/resuseableFunctions';
import MenuButtons from './menu-btns';
import BlogSkeleton from './blog-skeleton';
import RelatedPosts from './related-posts';
import EmptyBlog from '@/components/blogs/empty-blog';
import blogService from '@/appwrite/BlogService';

const BlogBadge = ({ isArchived, isDeleted }) => {
	let badgeText = 'New';
	let badgeColor = 'green';

	switch (true) {
		case isArchived && !isDeleted:
			badgeText = 'Archived';
			badgeColor = 'blue';
			break;
		case !isArchived && isDeleted:
			badgeText = 'Deleted';
			badgeColor = 'red';
			break;
		case !isArchived && !isDeleted:
			badgeText = 'Published';
			badgeColor = 'purple';
			break;
		// default:
		// 	badgeText = 'New';
		// 	badgeColor = 'green';
		// 	break;
	}

	return (
		<Badge ml="3" colorScheme={badgeColor}>
			{badgeText}
		</Badge>
	);
};

const Blogs = ({ blogs, error, loading = true }) => {
	const bgColor = useColorModeValue('white', 'gray.800');
	const textColor = useColorModeValue('gray.700', 'gray.200');
	const accentColor = useColorModeValue('purple.600', 'purple.400');

	console.log('State :: blogs', blogs);

	if (loading) {
		return <BlogSkeleton />;
	}

	if (error) {
		return <Text>Error fetching blogs</Text>;
	}

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

											<VStack align="start" spacing={0}>
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

													<BlogBadge
														isArchived={
															blog?.is_archived
														}
														isDeleted={
															blog?.is_deleted
														}
													/>
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
														<Text as="span" ml="2">
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
										{/* {blog?.authorId ===user.userData?.$id && <MenuButtons
											blogId={blog?.$id}
											blogFileId={blog?.coverImageId}
											fetchBlogs={fetchBlogs}
											userId={userId}
										/>} */}
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

						{
							blogs.length === 0 && <EmptyBlog type="blog" text="No blogs found" />
						}
				</>
			)}

			{/* {!isPersonal && <RelatedPosts/>} */}
		</Box>
	);
};

export default Blogs;
