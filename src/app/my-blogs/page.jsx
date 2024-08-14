import Blogs from '@/components/blogs';
import MegaBlog from '@/components/ui/MegaBlog';
import { Box } from '@chakra-ui/react';
import React from 'react'

export const metadata = {
	title: 'My Blogs',
	description: 'My Blogs page description', 
};

const MyBlogs = () => {
  return (
    <>
    <Box maxW='890px'>
    <Blogs />
    </Box>
    </>
  )
}

export default MyBlogs