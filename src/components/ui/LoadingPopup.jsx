'use client';
import React from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	Spinner,
	VStack,
	Text,
	useColorModeValue,
	useDisclosure,
	Button,
} from '@chakra-ui/react';

const LoadingPopup = ({ loading }) => {
	const { onClose } = useDisclosure();

	console.log('loading', loading);

	const textColor = useColorModeValue('gray.700', 'gray.200');
	const spinnerColor = useColorModeValue('purple.500', 'purple.300');

	return (
		<>
			<Modal isOpen={loading} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent bg="transparent" shadow="none">
					<ModalBody
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
						<VStack spacing={4}>
							<Spinner
								thickness="4px"
								speed="0.65s"
								color={spinnerColor}
								size="xl"
							/>
							<Text color={textColor} fontSize="lg">
								Loading, please wait...
							</Text>
						</VStack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default LoadingPopup;
