'use client';
import { Box, Heading, Text, Button, VStack, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

export default function NotFound() {
  const bg = useColorModeValue('gray.50', 'gray.900');
  const boxBg = useColorModeValue('white', 'gray.800');
  const headingColor = useColorModeValue('red.500', 'red.300');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const subTextColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <Box
      bg={bg}
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={6} textAlign="center" p={8} bg={boxBg} boxShadow="xl" borderRadius="lg">
        <Heading size="2xl" color={headingColor}>
          404 - Page Not Found
        </Heading>
        <Text fontSize="xl" color={textColor}>
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </Text>
        <Text fontSize="lg" color={subTextColor}>
          It seems we can&apos;t find what you&apos;re looking for. The link might be broken or the page may have been removed.
        </Text>
        <Link href="/home" passHref>
          <Button colorScheme="blue" size="lg">
            Return to Home
          </Button>
        </Link>
      </VStack>
    </Box>
  );
}