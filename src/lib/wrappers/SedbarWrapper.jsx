'use client';
import { Box, Flex, Image, Text, chakra } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import SidebarWithHeader from '@/components/sidebar-new';
import { fetchUserDetail } from '@/store/feature-user';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '@/components/navbar';

const SedbarWrapper = ({ children }) => {
	const dispatch = useDispatch();
	const pathname = usePathname();
	const publicRoutes = ['/sign-in', '/sign-up'];
	const isPublicRoute = publicRoutes.includes(pathname);
	const { loading } = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(fetchUserDetail());
	}, [dispatch]);

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

	if (isPublicRoute) {
		return <>{children}</>;
	}

	if (pathname === '/' || pathname === '/blogs') {
		return (
			<>
				<Navbar />
				<chakra.main p={6}>{children}</chakra.main>
			</>
		);
	}

	return (
		<>
			<SidebarWithHeader>{children}</SidebarWithHeader>
		</>
	);
};

export default SedbarWrapper;
