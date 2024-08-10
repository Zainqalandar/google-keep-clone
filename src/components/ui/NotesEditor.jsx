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
//   useColorModeValue,
  FormLabel,
} from '@chakra-ui/react';
import {
  AddIcon,
  EditIcon,
  CheckIcon,
  DeleteIcon,
  LinkIcon,
} from '@chakra-ui/icons';

const NotesEditor = () => {
//   const bgColor = useColorModeValue('white', 'gray.800');
//   const textColor = useColorModeValue('gray.700', 'gray.200');
//   const accentColor = useColorModeValue('blue.600', 'blue.400');
//   const inputBgColor = useColorModeValue('gray.50', 'gray.700');
  const bgColor = 'gray.800';
  const textColor = 'gray.200';
  const accentColor = 'blue.400';
  const inputBgColor = 'gray.700';

  return (
    <Box
      bg={bgColor}
      p={8}
      borderRadius="md"
      boxShadow="xl"
      maxW="800px"
      mx="auto"
      my={10}
    >
      {/* Editor Header */}
      <VStack spacing={6} align="start" mb={6}>
        <Heading size="2xl" color={accentColor}>
          Edit Note
        </Heading>
        <Input
          placeholder="Enter Note Title"
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
          icon={<AddIcon />}
          aria-label="Bold text"
          size="lg"
          colorScheme="blue"
          variant="outline"
        />
        <IconButton
          icon={<EditIcon />}
          aria-label="Italic text"
          size="lg"
          colorScheme="blue"
          variant="outline"
        />
        <IconButton
          icon={<CheckIcon />}
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
      </HStack>

      {/* Content Area */}
      <Textarea
        placeholder="Start writing your note here..."
        size="lg"
        rows={10}
        bg={inputBgColor}
        borderColor={textColor}
        color={textColor}
      />

      <Divider my={6} />

      {/* Action Buttons */}
      <HStack justify="space-between">
        <Button colorScheme="blue" size="lg" variant="outline">
          Save Note
        </Button>
        <Button colorScheme="green" size="lg">
          Save & Exit
        </Button>
        <IconButton
          icon={<DeleteIcon />}
          aria-label="Delete note"
          size="lg"
          colorScheme="red"
          variant="outline"
        />
      </HStack>
    </Box>
  );
};

export default NotesEditor;
