'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Box,
  Center,
  Input,
  Textarea,
  Stack,
  Avatar,
  useColorModeValue,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
} from '@chakra-ui/react'

export default function NotesPopup({ text = 'computer', image }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState('computer is an electronic machine')
  const [description, setDescription] = useState('Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.')

  return (
    <>
      <Button onClick={onOpen}>Open Popup</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center py={6}>
              <Box
                maxW={'445px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}>
                <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
                  <Image
                    src='/b1.avif'
                    fill
                    alt="Example"
                  />
                </Box>
                <Stack spacing={4}>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    variant='flushed'
                    fontSize={'2xl'}
                    fontWeight={'bold'}
                    color={useColorModeValue('gray.700', 'white')}
                  />
                  <Textarea
                  css={{
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: '#f1f1f1',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#888',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      background: '#555',
                    },
                  }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    variant='flushed'
                    color={'gray.500'}
                  />
                </Stack>
                <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                  <Avatar src={'https://avatars0.githubusercontent.com/u/1164541?v=4'} />
                  <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                    <Text fontWeight={600}>Achim Rolle</Text>
                    <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
                  </Stack>
                </Stack>
              </Box>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}