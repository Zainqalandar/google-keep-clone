'use client';
import React from 'react';
import {
	Box,
	Flex,
	Text,
	Button,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation'
import { Link } from '@chakra-ui/next-js';
import authService from '@/appwrite/auth';
import { useNotification } from '@/provider/context/NotificationProvider';

const Navbar = () => {
	const { toggleColorMode } = useColorMode();
	const router = useRouter()
	const bgColor = useColorModeValue('gray.100', 'gray.900');
	const color = useColorModeValue('gray.800', 'white');
	const notify = useNotification();

	const logout = async () => {
		console.log('logout');
		try {
			const isLogout = await authService.logout();
			router.push('/sign-in');
			notify('Logout successfully', 'success', 3000);
			if (isLogout) {
				console.log('Logout successfully');
			}
		} catch (error) {
			console.error(error);
			notify(`${error.message}`, 'error', 3000);
		}
	};

	return (
		<Box bg={bgColor} px={4}>
			<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
				<Link href="/">
					<Text fontSize="xl" fontWeight="bold" color={color}>
						MyWebsite
					</Text>
				</Link>
				<Flex alignItems={'center'}>
					<Button onClick={toggleColorMode} mr={4}>
						Toggle Mode
					</Button>

					<Link href="/sign-in">
						<Button colorScheme="teal" variant="solid">
							Sign In
						</Button>
					</Link>
					<Button onClick={() => logout()} ml='10px' colorScheme="red" variant="outline">
						Logout
					</Button>
				</Flex>
			</Flex>
		</Box>
	);
};

export default Navbar;
