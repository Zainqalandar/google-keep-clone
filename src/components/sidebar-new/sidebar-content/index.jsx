'use client'
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Image,
} from '@chakra-ui/react'

import { BsFillBellFill } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';
import { HiArchiveBoxXMark } from 'react-icons/hi2';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { HiLightBulb } from "react-icons/hi2";
import { ImBlogger2 } from "react-icons/im";
import { MdEditNote } from "react-icons/md";
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const LinkItems = [
	{ name: 'Notes', icon: HiLightBulb, href: '/home' },
	{ name: 'Edit Notes', icon: MdEditNote, href: '/edit-notes' },
	{ name: 'Blog', icon: ImBlogger2, href: '/blog' },
	{ name: 'Reminders', icon: BsFillBellFill, href: '/reminders' },
	{ name: 'Edit labels', icon: MdModeEdit, href: '/edit-labels' },
	{ name: 'Archive', icon: HiArchiveBoxXMark, href: '/archive' },
	{ name: 'Bin', icon: RiDeleteBin6Line, href: '/bin' },
];

const SidebarContent = ({ onClose, ...rest }) => {
    return (
      <Box
        transition="3s ease"
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        {...rest}>
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link href="/">
        <Image src="/google-keep.png" alt="Logo" boxSize="40px" />
        </Link>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} LinkItem={link.href}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    )
  }

  const NavItem = ({ icon, LinkItem, children, ...rest }) => {
    const pathName = usePathname()
    return (
      <Box
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}>
        <Link href={LinkItem}>
        <Flex
          align="center"
          bg={pathName === LinkItem ? "cyan.400" : undefined}
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          {...rest}>
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
        </Link>
      </Box>
    )
  }

export default SidebarContent;