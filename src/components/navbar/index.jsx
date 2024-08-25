'use client';
import React from 'react';
import nookies from 'nookies';
import {
	chakra,
	Box,
	Flex,
	useColorModeValue,
	HStack,
	Link,
	IconButton,
	useDisclosure,
	Button,
	Popover,
	PopoverTrigger,
	PopoverContent,
	Image,
} from '@chakra-ui/react';
import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useColorMode } from '@chakra-ui/react';
import { useViewportScroll } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import authService from '@/appwrite/auth';
import { useNotification } from '@/lib/provider/context/NotificationProvider';
import { getUserDetail } from '@/store/feature-user';
import Features from './features';
import MobileNavContent from './mobile-nav-content';

const Navbar = () => {
	const { toggleColorMode: toggleMode } = useColorMode();
	const notify = useNotification();
	const text = useColorModeValue('dark', 'light');
	const SwitchIcon = useColorModeValue(FaMoon, FaSun);
	const bg = useColorModeValue('white', 'gray.900');
	const ref = React.useRef(null);
	const [y, setY] = React.useState(0);
	const height = ref.current ? ref.current.getBoundingClientRect() : 0;
	const { scrollY } = useViewportScroll();
	React.useEffect(() => {
		return scrollY.onChange(() => setY(scrollY.get()));
	}, [scrollY]);
	const cl = useColorModeValue('gray.800', 'white');
	const mobileNav = useDisclosure();
	const router = useRouter();
	const [loading, setLoading] = React.useState(false);
	const allUserData = useSelector((state) => state);
	const isActive = useSelector((state) => state.user.isActive);
	const dispatch = useDispatch();

	const handleLogout = async () => {
		try {
			setLoading(true);
			const isLogout = await authService.logout();
			nookies.destroy(null, 'userId', { path: '/' });
			dispatch(getUserDetail({}));
			notify('Logout successfully', 'success', 3000);
			router.push('/sign-in');
			if (isLogout) {
				console.log('Logout successfully');
			}
		} catch (error) {
			console.error(error);
			notify(`${error.message}`, 'error', 3000);
		} finally {
			setLoading(false);
		}
	};

	return (
		<React.Fragment>
			<chakra.header
				ref={ref}
				shadow={y > height ? 'sm' : undefined}
				transition="box-shadow 0.2s"
				bg={bg}
				borderTopColor="brand.400"
				w="full"
				overflowY="hidden"
			>
				<chakra.div h="4.5rem" mx="auto" maxW="1200px">
					<Flex
						w="full"
						h="full"
						px="6"
						alignItems="center"
						justifyContent="space-between"
					>
						<Flex align="flex-start">
							<Box onClick={() => router.push('/')}>
								<HStack>
									<Image
									cursor="pointer"
										src="/google-keep.png"
										alt="Logo"
										boxSize="40px"
									/>
								</HStack>
							</Box>
						</Flex>
						<Flex>
							<HStack
								spacing="5"
								display={{
									base: 'none',
									md: 'flex',
								}}
							>
								<Popover>
									<PopoverTrigger>
										<Button
											bg={bg}
											color="gray.500"
											display="inline-flex"
											alignItems="center"
											fontSize="md"
											_hover={{
												color: cl,
											}}
											_focus={{
												boxShadow: 'none',
											}}
											rightIcon={<IoIosArrowDown />}
										>
											Features
										</Button>
									</PopoverTrigger>
									<PopoverContent
										w="100vw"
										maxW="md"
										_focus={{
											boxShadow: 'md',
										}}
									>
										<Features />
									</PopoverContent>
								</Popover>
								<Button
									onClick={() => router.push('/blogs')}
									bg={bg}
									color="gray.500"
									display="inline-flex"
									alignItems="center"
									fontSize="md"
									_hover={{
										color: cl,
									}}
									_focus={{
										boxShadow: 'none',
									}}
								>
									Blog
								</Button>
								<Button
									bg={bg}
									color="gray.500"
									display="inline-flex"
									alignItems="center"
									fontSize="md"
									_hover={{
										color: cl,
									}}
									_focus={{
										boxShadow: 'none',
									}}
								>
									Pricing
								</Button>
							</HStack>
						</Flex>
						<Flex
							justify="flex-end"
							align="center"
							color="gray.400"
						>
							<HStack
								spacing="5"
								display={{
									base: 'none',
									md: 'flex',
								}}
							>
								{isActive ? (
									<Button
										isLoading={loading}
										loadingText="Logout"
										onClick={() => handleLogout()}
										colorScheme="red"
										variant="solid"
										size="sm"
									>
										Logout
									</Button>
								) : (
									<>
										<Button
											onClick={() =>
												router.push('/sign-in')
											}
											colorScheme="brand"
											variant="ghost"
											size="sm"
										>
											Sign in
										</Button>
										<Button
											onClick={() =>
												router.push('/sign-up')
											}
											colorScheme="green"
											variant="solid"
											size="sm"
										>
											Sign up
										</Button>
									</>
								)}
							</HStack>
							<IconButton
								size="md"
								fontSize="lg"
								aria-label={`Switch to ${text} mode`}
								variant="ghost"
								color="current"
								ml={{
									base: '0',
									md: '3',
								}}
								onClick={toggleMode}
								icon={<SwitchIcon />}
							/>
							<IconButton
								display={{
									base: 'flex',
									md: 'none',
								}}
								aria-label="Open menu"
								fontSize="20px"
								color="gray.800"
								_dark={{
									color: 'inherit',
								}}
								variant="ghost"
								icon={<AiOutlineMenu />}
								onClick={mobileNav.onOpen}
							/>
						</Flex>
					</Flex>
					<MobileNavContent />
				</chakra.div>
			</chakra.header>
		</React.Fragment>
	);
};

export default Navbar;
