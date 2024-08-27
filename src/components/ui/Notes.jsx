'use client'

import Image from 'next/image'
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'

export default function Notes({ text = 'Note Title', image, date = 'Aug 25, 2024', time = '3:45 PM' }) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const imageBgColor = useColorModeValue('gray.100', 'gray.700')
  const headingColor = useColorModeValue('gray.800', 'white')
  const textColor = useColorModeValue('gray.600', 'gray.400')

  return (
    <Center py={4}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={bgColor}
        boxShadow={'lg'}
        rounded={'lg'}
        p={4}
        overflow={'hidden'}
        borderColor={borderColor}
        borderWidth={'1px'}
      >
        {image && (
          <Box
            h={'150px'}
            bg={imageBgColor}
            mb={4}
            pos={'relative'}
            borderRadius={'lg'}
            overflow={'hidden'}
          >
            <Image
              src={image}
              fill
              alt="Note Image"
              style={{ objectFit: 'cover' }}
            />
          </Box>
        )}
        <Stack>
          <Heading
            color={headingColor}
            fontSize={'xl'}
            fontFamily={'body'}
            mb={2}
          >
            {text}
          </Heading>
          <Text color={textColor} fontSize={'sm'}>
            {date} · {time}
          </Text>
          <Text color={textColor} mt={2}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          </Text>
        </Stack>
      </Box>
    </Center>
  )
}