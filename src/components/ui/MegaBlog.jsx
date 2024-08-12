'use client';
import React, { useEffect, useState } from 'react';
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
import { formatDate } from '@/lib/utils/resuseableFunctions';

const MegaBlog = () => {
	const bgColor = useColorModeValue('white', 'gray.800');
	const textColor = useColorModeValue('gray.700', 'gray.200');
	const accentColor = useColorModeValue('purple.600', 'purple.400');

	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const res = await blogService.getBlogs();
				setBlogs(res.documents);
			} catch (error) {
				console.error('Error getting blogs :: ', error);
			}
		})();
	}, []);

	const userDataString = localStorage.getItem('user_data');
	const userData = JSON.parse(userDataString);

	function getNameFromEmail(email) {
		const username = email.split('@')[0];
		const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
		return capitalizedUsername;
	}

	
function getColorFromId(id) {
    function hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    }

    const colors = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFF5", "#FF8C33", "#8CFF33", "#338CFF", "#FF338C"
    ];

    const hash = hashString(id);
    const colorIndex = Math.abs(hash) % colors.length;

    return colors[colorIndex];
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
			{/* Blog Header */}
			{blogs
				?.map((blog, index) => (
					<div key={index}>
						<VStack spacing={6} align="start">
							<Image
								src={blogService.getBlogFile(blog.coverImageId)}
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
									<Text fontWeight="bold" color={textColor}>
										{blog?.name}
									</Text>
									<Text fontSize="sm" color={textColor}>
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
									__html: blog.content,
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
	);
};

export default MegaBlog;
