'use client';

import {
	Box,
	Flex,
	Avatar,
	Text,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useDisclosure,
	useColorModeValue,
	Stack,
	useColorMode,
	Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import authService from '@/appwrite/auth';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/lib/provider/context/NotificationProvider';

const NavLink = ({ children }) => {
	return (
		<Box
			as="a"
			px={2}
			py={1}
			rounded={'md'}
			_hover={{
				textDecoration: 'none',
				bg: useColorModeValue('gray.200', 'gray.700'),
			}}
			href={'#'}
		>
			{children}
		</Box>
	);
};

export default function Navbar() {
	const router = useRouter();
	const notify = useNotification();
	const { colorMode, toggleColorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const HandleLogout = async () => {
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
		<>
			<Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
				<Flex
					h={16}
					alignItems={'center'}
					justifyContent={'space-between'}
				>
					<Box>Keep</Box>

					<Flex alignItems={'center'}>
						<Stack direction={'row'} spacing={7}>
							<Button onClick={toggleColorMode}>
								{colorMode === 'light' ? (
									<MoonIcon />
								) : (
									<SunIcon />
								)}
							</Button>

							<Menu>
								<MenuButton
									as={Button}
									rounded={'full'}
									variant={'link'}
									cursor={'pointer'}
									minW={0}
								>
									<Avatar
										size={'sm'}
										src={
											'/zain-qalandar.jpg'
										}
									/>
								</MenuButton>
								<MenuList alignItems={'center'}>
									<br />
									<Center>
										<Avatar
											size={'2xl'}
											src={
												'/zain-qalandar.jpg'
											}
										/>
									</Center>
									<br />
									<Center>
										<p>Syed Zain Qalandar</p>
									</Center>
									<br />
									<MenuDivider />
									<MenuItem>Your Servers</MenuItem>
									<MenuItem>Account Settings</MenuItem>
									<MenuItem onClick={HandleLogout}>
										Logout
									</MenuItem>
								</MenuList>
							</Menu>
						</Stack>
					</Flex>
				</Flex>
			</Box>
		</>
	);
}
