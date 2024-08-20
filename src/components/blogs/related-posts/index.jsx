import {
	Box,
	Heading,
	HStack,
	Image,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

const RelatedPosts = () => {
	const accentColor = useColorModeValue('purple.600', 'purple.400');
	const textColor = useColorModeValue('gray.700', 'gray.200');
	return (
		<>
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
		</>
	);
};

export default RelatedPosts;
