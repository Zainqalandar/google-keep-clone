'use client';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/ui/Navbar';
import { Box, Flex, Image, Text, chakra } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import DashbordNav from '@/components/ui/DashbordNav';
import SidebarWithHeader from '@/components/sidebar-new';
import { fetchUserDetail } from '@/store/feature-user';
import { useDispatch, useSelector } from 'react-redux';

const SedbarWrapper = ({ children }) => {
	const dispatch = useDispatch();
	const pathname = usePathname();
	const publicRoutes = ['/sign-in', '/sign-up'];
	const isPublicRoute = publicRoutes.includes(pathname);
	const { loading } = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(fetchUserDetail());
	}, [dispatch]);

	// Loading state of the user is not yet determined

	if (loading) {
		return (
			<Flex
				position="fixed"
				top="0"
				left="0"
				width="100vw"
				height="100vh"
				justifyContent="center"
				alignItems="center"
				bg="white"
				zIndex="1000"
				direction="column"
			>
				<Box>
					<Image src="/google-keep.png" alt="Logo" boxSize="60px" />
				</Box>
				<Text mt={4} fontSize="xl" fontWeight="bold" color="gray.700">
					Loading, please wait...
				</Text>
			</Flex>
		);
	}

	// if the route is public, we don't need to show the sidebar

	if (isPublicRoute) {
		return <>{children}</>;
	}

	// we only show Navbar at path / and /my-blogs

	if (pathname === '/' || pathname === '/my-blogs') {
		return (
			<>
				<DashbordNav />
				<chakra.main p={6}>{children}</chakra.main>
			</>
		);
	}

	// if the route is private, we show the sidebar

	return (
		<>
			{/* <Sidebar /> */}
			<SidebarWithHeader>{children}</SidebarWithHeader>
			{/* <Box flexGrow={1} p={2} minH="100vh" overflow="auto">
				<Navbar />
				<chakra.main p={6}>{children}</chakra.main>
			</Box> */}
		</>
	);
};

export default SedbarWrapper;
