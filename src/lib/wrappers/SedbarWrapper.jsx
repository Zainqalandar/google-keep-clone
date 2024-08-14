'use client';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/ui/Navbar';
import { Box, Flex, chakra } from '@chakra-ui/react';
import React from 'react';
import { usePathname } from 'next/navigation';
import DashbordNav from '@/components/ui/DashbordNav';

const SedbarWrapper = ({ children }) => {
	const pathname = usePathname();
	const publicRoutes = ['/sign-in', '/sign-up'];
	const isPublicRoute = publicRoutes.includes(pathname);
	

	// if the route is public, we don't need to show the sidebar

	if (isPublicRoute) {
		return <>{children}</>;
	}

	// we only show Navbar at path / and /my-blogs

	if ((pathname === '/' || pathname === '/my-blogs')) {
		console.log(pathname, 'pathname')
		return (
			<>
				<DashbordNav />
				<chakra.main p={6}>{children}</chakra.main>
			</>
		);
	}

	// if the route is private, we show the sidebar

	return (
		<Flex>
			<Sidebar />
			<Box flexGrow={1} p={2} minH="100vh" overflow="auto">
				<Navbar />
				<chakra.main p={6}>{children}</chakra.main>
			</Box>
		</Flex>
	);
};

export default SedbarWrapper;
