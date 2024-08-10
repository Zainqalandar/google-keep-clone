'use client'
import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  IconButton,
  SimpleGrid,
//   useColorModeValue,
  Button,
  Input,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

const MegaNotes = () => {
//   const bgColor = useColorModeValue('white', 'gray.800');
//   const textColor = useColorModeValue('gray.700', 'gray.200');
//   const accentColor = useColorModeValue('blue.600', 'blue.400');
//   const noteBgColor = useColorModeValue('gray.100', 'gray.700');
  const bgColor = 'gray.800';
  const textColor = 'gray.200';
  const accentColor = 'blue.400';
  const noteBgColor = 'gray.700';

  const borderColor = 'gray.600';
  // const borderColor = useColorModeValue('gray.200', 'gray.600');

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
      {/* Header */}
      <HStack justify="space-between" mb={6}>
        <Heading size="2xl" color={accentColor}>
          My Notes
        </Heading>
        <Button colorScheme="blue" leftIcon={<AddIcon />}>
          Add New Note
        </Button>
      </HStack>

      {/* Note Categories */}
      <HStack spacing={4} mb={6}>
        {['All', 'Work', 'Personal', 'Ideas'].map((category) => (
          <Button key={category} variant="outline" colorScheme="blue">
            {category}
          </Button>
        ))}
      </HStack>

      {/* Notes Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
      {[1, 2, 3, 4, 5, 6].map((note) => (
        <Box
          key={note}
          bg={noteBgColor}
          p={8}
          borderRadius="md"
          boxShadow="xl"
          borderWidth="1px"
          borderColor={borderColor}
          position="relative"
          _hover={{ transform: 'scale(1.05)', transition: '0.3s' }}
        >
          <HStack justify="space-between" mb={4}>
            <Heading size="lg" color={accentColor}>
              Note Title {note}
            </Heading>
            <HStack spacing={2}>
              <IconButton
                icon={<EditIcon />}
                size="md"
                aria-label="Edit note"
                variant="outline"
                colorScheme="blue"
              />
              <IconButton
                icon={<DeleteIcon />}
                size="md"
                aria-label="Delete note"
                variant="outline"
                colorScheme="red"
              />
            </HStack>
          </HStack>
          <Text fontSize="lg" lineHeight="tall" color={textColor}>
            This is a detailed note description. It provides an in-depth
            overview of the note&apos;s content, allowing for a clearer
            understanding...
          </Text>
        </Box>
      ))}
    </SimpleGrid>

      {/* Add New Note Section */}
      <Box mt={8} p={6} bg={noteBgColor} borderRadius="md" boxShadow="md">
        <Heading size="lg" mb={4} color={textColor}>
          Add a New Note
        </Heading>
        <VStack spacing={4} align="start">
          <Input placeholder="Note Title" size="lg" />
          <Input placeholder="Note Content" size="lg" />
          <Button colorScheme="blue" leftIcon={<AddIcon />}>
            Save Note
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default MegaNotes;
