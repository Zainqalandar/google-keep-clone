'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { store } from '@/store';
import { Provider } from 'react-redux';

export function Providers({ children }) {
	return (
		<ChakraProvider>
			<Provider store={store}>{children}</Provider>
		</ChakraProvider>
	);
}
