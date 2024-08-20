import { Skeleton, VStack, HStack, Avatar, Text, Divider, Link } from "@chakra-ui/react";

const BlogSkeleton = () => {
  return (
    <div>
      <VStack spacing={6} align="start">
        <Skeleton w="full" h="400px" borderRadius="md" />

        <Skeleton height="40px" w="60%" />

        <HStack spacing={4}>
          <Skeleton circle size="md">
            <Avatar size="md" />
          </Skeleton>
          <VStack align="start" spacing={0}>
            <Skeleton height="20px" w="40%" />
            <Skeleton height="15px" w="30%" />
          </VStack>
        </HStack>
      </VStack>

      <Divider my={6} />

      {/* Blog Content */}
      <VStack spacing={4} align="start">
        <Skeleton height="20px" w="90%" />
        <Skeleton height="20px" w="85%" />
        <Skeleton height="20px" w="80%" />
        
        <Skeleton height="20px" w="20%">
          <Link>Read more</Link>
        </Skeleton>
      </VStack>

      <Divider my={6} />
    </div>
  );
};

export default BlogSkeleton;
