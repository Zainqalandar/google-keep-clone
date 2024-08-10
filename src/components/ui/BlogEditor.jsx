'use client'
import React from 'react';
import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
  IconButton,
  Divider,
  Text,
  useColorModeValue,
  Select,
  FormLabel,
} from '@chakra-ui/react';
import {
  DeleteIcon,
  LinkIcon,
} from '@chakra-ui/icons';
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";

const BlogEditor = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const accentColor = useColorModeValue('purple.600', 'purple.400');
  const inputBgColor = useColorModeValue('gray.50', 'gray.700');

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
      {/* Editor Header */}
      <VStack spacing={6} align="start" mb={6}>
        <Heading size="2xl" color={accentColor}>
          Create a New Blog Post
        </Heading>
        <Input
          placeholder="Enter Blog Title"
          size="lg"
          bg={inputBgColor}
          borderColor={textColor}
          color={textColor}
        />
      </VStack>

      <Divider my={6} />

      {/* Formatting Toolbar */}
      <HStack spacing={4} mb={6}>
        <IconButton
          icon={<FaBold />}
          aria-label="Bold text"
          size="lg"
          colorScheme="blue"
          variant="outline"
        />
        <IconButton
          icon={<FaItalic />}
          aria-label="Italic text"
          size="lg"
          colorScheme="blue"
          variant="outline"
        />
        <IconButton
          icon={<FaUnderline />}
          aria-label="Underline text"
          size="lg"
          colorScheme="blue"
          variant="outline"
        />
        <IconButton
          icon={<LinkIcon />}
          aria-label="Add link"
          size="lg"
          colorScheme="blue"
          variant="outline"
        />
        <Select placeholder="Heading" size="lg" color={textColor} bg={inputBgColor} borderColor={textColor}>
          <option>Heading 1</option>
          <option>Heading 2</option>
          <option>Heading 3</option>
        </Select>
      </HStack>

      {/* Content Area */}
      <Textarea
        placeholder="Start writing your blog post here..."
        size="lg"
        rows={10}
        bg={inputBgColor}
        borderColor={textColor}
        color={textColor}
      />

      <Divider my={6} />

      {/* Preview Section */}
      <VStack align="start" spacing={4} mb={6}>
        <Heading size="lg" color={accentColor}>
          Preview
        </Heading>
        <Box
          bg={inputBgColor}
          p={6}
          borderRadius="md"
          borderWidth="1px"
          borderColor={textColor}
          w="full"
        >
          <Heading size="md" mb={4} color={textColor}>
            Blog Title
          </Heading>
          <Text fontSize="lg" color={textColor}>
            This is a preview of your blog content. Start writing to see your
            changes here...
          </Text>
        </Box>
      </VStack>

      <Divider my={6} />

      {/* Action Buttons */}
      <HStack justify="space-between">
        <Button colorScheme="blue" size="lg" variant="outline">
          Save Draft
        </Button>
        <Button colorScheme="green" size="lg">
          Publish Post
        </Button>
        <IconButton
          icon={<DeleteIcon />}
          aria-label="Delete draft"
          size="lg"
          colorScheme="red"
          variant="outline"
        />
      </HStack>
    </Box>
  );
};

export default BlogEditor;
