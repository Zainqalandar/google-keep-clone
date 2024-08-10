'use client';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/ui/Navbar';
import { Box, Flex, chakra } from '@chakra-ui/react';
import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation'

const SedbarWrapper = ({ children }) => {
    const pathname = usePathname()
    const publicRoutes = ['/sign-in', '/sign-up'];
    const isPublicRoute = publicRoutes.includes(pathname);
    console.log('pathname', pathname);
    if (isPublicRoute) {
        return <>{children}</>;
    }

	return (
		<Flex>
			<Sidebar />
			<Box flexGrow={1} p={2} minH="100vh" overflow="auto">
				<Navbar />
				<chakra.main
					p={6}
					// bg="gray.50"
				>
					{children}
				</chakra.main>
			</Box>
		</Flex>
	);
};

export default SedbarWrapper;
