'use client';

import React from 'react';
import {
	IconButton,
	Box,
	CloseButton,
	Flex,
	Icon,
	useColorModeValue,
	Text,
	Drawer,
	DrawerContent,
	useDisclosure,
	Image,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
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

export default function Sidebar() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
			<SidebarContent
				onClose={onClose}
				display={{ base: 'none', md: 'block' }}
			/>
			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p="4">
				{/* Content */}
			</Box>
		</Box>
	);
}

const SidebarContent = ({ onClose, ...rest }) => {
	return (
		<Box
			bg={useColorModeValue('white', 'gray.900')}
			borderRight="1px"
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			w={{ base: 'full', md: 60 }}
			pos="fixed"
			h="full"
			{...rest}
		>
			<Flex
				h="20"
				alignItems="center"
				mx="8"
				justifyContent="space-between"
			>
				<Image src="/google-keep.png" alt="Logo" boxSize="40px" />
				<CloseButton
					display={{ base: 'flex', md: 'none' }}
					onClick={onClose}
				/>
			</Flex>
			{LinkItems.map((link) => (
				<Link key={link.name} href={link.href}>
					<NavItem href={link.href} icon={link.icon}>{link.name}</NavItem>
				</Link>
			))}
		</Box>
	);
};

const NavItem = ({ icon, href, children, ...rest }) => {
	const pathName = usePathname()
	return (
		<Box
			as="a"
			// href="#"
			style={{ textDecoration: 'none' }}
			_focus={{ boxShadow: 'none' }}
		>
			<Flex
				align="center"
				p="4"
				mx="4"
				borderradius="lg"	
				bg={pathName === href ? "cyan.400" : undefined}
				role="group"
				cursor="pointer"
				_hover={{
					bg: 'cyan.400',
					color: 'white',
				}}
				{...rest}
			>
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
		</Box>
	);
};

const MobileNav = ({ onOpen, ...rest }) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 24 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue('white', 'gray.900')}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			justifyContent="flex-start"
			{...rest}
		>
			<IconButton
				variant="outline"
				onClick={onOpen}
				aria-label="open menu"
				icon={<FiMenu />}
			/>
		</Flex>
	);
};
