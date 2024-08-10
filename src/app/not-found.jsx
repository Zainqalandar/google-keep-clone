import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box
      bg="gray.50"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={6} textAlign="center" p={8} bg="white" boxShadow="xl" borderRadius="lg">
        <Heading size="2xl" color="red.500">
          404 - Page Not Found
        </Heading>
        <Text fontSize="xl" color="gray.600">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </Text>
        <Text fontSize="lg" color="gray.500">
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
