'use client';
import React, { useState } from 'react';
import {
	ChakraProvider,
	Box,
	VStack,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Button,
	Tag,
	TagLabel,
	TagCloseButton,
} from '@chakra-ui/react';
import service from '@/appwrite/config';

const EditTodo = ({ handleRefresh }) => {
	const initTodo = {
		title: '',
		description: '',
		status: false,
		tags: [],
	};
	const [todo, setTodo] = useState(initTodo);
	const [tagInput, setTagInput] = useState('');

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setTodo((prevState) => ({
			...prevState,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleTagChange = (e) => {
		setTagInput(e.target.value);
	};

	const handleAddTag = () => {
		if (tagInput) {
			setTodo((prevState) => ({
				...prevState,
				tags: [...prevState.tags, tagInput],
			}));
			setTagInput('');
		}
	};

	const handleRemoveTag = (tagToRemove) => {
		setTodo((prevState) => ({
			...prevState,
			tags: prevState.tags.filter((tag) => tag !== tagToRemove),
		}));
	};
	const handleSubmit = () => {
		try {
			service.createTodo(
				todo.title,
				todo.description,
				todo.status,
				todo.tags
			);
			setTodo(initTodo);
			handleRefresh();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<ChakraProvider>
			<Box
				maxW="sm"
				borderWidth="1px"
				borderradius="lg"
				overflow="hidden"
				p={4}
				m="auto"
				mt={10}
				boxShadow="lg"
				bg="white"
			>
				<VStack align="start" spacing={4}>
					<FormControl>
						<FormLabel>Title</FormLabel>
						<Input
							name="title"
							value={todo.title}
							onChange={handleInputChange}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Description</FormLabel>
						<Input
							name="description"
							value={todo.description}
							onChange={handleInputChange}
						/>
					</FormControl>
					<FormControl display="flex" alignItems="center">
						<Checkbox
							name="status"
							isChecked={todo.status}
							onChange={handleInputChange}
							mr={2}
						/>
						<FormLabel mb="0">Completed</FormLabel>
					</FormControl>
					<FormControl>
						<FormLabel>Tags</FormLabel>
						<VStack align="start">
							{todo.tags.map((tag, index) => (
								<Tag
									key={index}
									borderradius="full"
									variant="solid"
									colorScheme="teal"
									mb={1}
								>
									<TagLabel>{tag}</TagLabel>
									<TagCloseButton
										onClick={() => handleRemoveTag(tag)}
									/>
								</Tag>
							))}
							<Input
								value={tagInput}
								onChange={handleTagChange}
								placeholder="Add new tag"
								size="sm"
							/>
							<Button
								onClick={handleAddTag}
								size="sm"
								colorScheme="teal"
							>
								Add Tag
							</Button>
							<Button
								onClick={() => handleSubmit()}
								size="sm"
								colorScheme="teal"
							>
								Submit
							</Button>
						</VStack>
					</FormControl>
				</VStack>
			</Box>
		</ChakraProvider>
	);
};

export default EditTodo;
