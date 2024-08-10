'use client'
import React from 'react';
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
} from '@chakra-ui/react';

const MegaBlog = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const accentColor = useColorModeValue('purple.600', 'purple.400');

  return (
    <Box
      bg={bgColor}
      p={8}
      borderRadius="md"
      boxShadow="xl"
      maxW="1200px"
      mx="auto"
      my={10}
    >
      {/* Blog Header */}
      <VStack spacing={6} align="start">
        <Image
          src="/blog-bg.avif"
          alt="Blog image"
          borderRadius="md"
          w="full"
          h="400px"
          objectFit="cover"
        />
        <Heading size="2xl" color={accentColor}>
          The Art of Writing Clean Code
        </Heading>
        <HStack spacing={4}>
          <Avatar
            src="https://source.unsplash.com/random/100x100"
            name="John Doe"
            size="md"
          />
          <VStack align="start" spacing={0}>
            <Text fontWeight="bold" color={textColor}>
              John Doe
            </Text>
            <Text fontSize="sm" color={textColor}>
              July 10, 2024
            </Text>
          </VStack>
        </HStack>
      </VStack>

      <Divider my={6} />

      {/* Blog Content */}
      <VStack spacing={4} align="start">
        <Text fontSize="lg" color={textColor}>
          Writing clean code is an essential skill for every software developer.
          Clean code is easy to read, understand, and maintain. It helps ensure
          that your codebase remains flexible and scalable as the project
          evolves...
        </Text>
        <Text fontSize="lg" color={textColor}>
          Here are a few key principles to keep in mind when writing clean code:
          simplicity, consistency, and clarity. Simplicity ensures that your
          code does what it&apos;s supposed to do without unnecessary complexity...
        </Text>
        <Link color={accentColor} fontWeight="bold" href="#">
          Read more
        </Link>
      </VStack>

      <Divider my={6} />

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
              borderRadius="md"
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
