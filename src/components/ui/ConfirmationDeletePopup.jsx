import React from 'react';
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Text,
	VStack,
	HStack,
	useColorModeValue,
	MenuItem,
	Box,
} from '@chakra-ui/react';
import { FiTrash } from 'react-icons/fi';
import { MdOutlineDeleteForever } from 'react-icons/md';

const ConfirmationDeletePopup = ({ blogId, blogFileId, onHandleDelete }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const textColor = useColorModeValue('gray.700', 'gray.200');
	const accentColor = useColorModeValue('purple.600', 'purple.400');
	const deleteButtonColor = useColorModeValue('red.500', 'red.600');
	const cancelButtonColor = useColorModeValue('gray.500', 'gray.600');

	return (
		<>
			<MenuItem
				onClick={onOpen}
				icon={<Box as={MdOutlineDeleteForever} boxSize={5} />}
			>
				delete permanently
			</MenuItem>

			<Modal
				closeOnOverlayClick={false}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader color={accentColor}>
						Confirm Deletion
					</ModalHeader>
					<ModalCloseButton />

					<ModalBody>
						<VStack spacing={4} align="start">
							<Text fontSize="lg" color={textColor}>
								Are you sure you want to delete this Blog? This
								action cannot be undone.
							</Text>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<HStack spacing={4}>
							<Button
								colorScheme="red"
								bg={deleteButtonColor}
								color="white"
								_hover={{ bg: 'red.600' }}
								onClick={() => {
									onHandleDelete(blogId, blogFileId);
									onClose();
								}}
							>
								Delete
							</Button>
							<Button
								onClick={onClose}
								bg={cancelButtonColor}
								color="white"
								_hover={{ bg: 'gray.600' }}
							>
								Cancel
							</Button>
						</HStack>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ConfirmationDeletePopup;
