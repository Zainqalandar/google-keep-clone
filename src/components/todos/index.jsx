'use client';
import React, { useEffect, useState } from 'react';
import {
	Box,
	Heading,
	Text,
	Badge,
	VStack,
} from '@chakra-ui/react';
import service from '@/appwrite/config';
import EditTodo from './edit-todo';

const Todos = () => {
	const [todos, setTodos] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const handleRefresh = () => {
		setRefresh(!refresh);
	}
	useEffect(() => {
		const getTodos = async () => {
			try {
				const response = await service.getTodos();
				setTodos(response.documents);
			} catch (error) {
				console.error(error);
			}
		}
		getTodos();
	}, [refresh])
	
	return (
		<>
		{todos.map((todo, index) => (
				<Box
				maxW="sm"
				borderWidth="1px"
				borderRadius="lg"
				overflow="hidden"
				p={4}
				m="auto"
				mt={10}
				boxShadow="lg"
				bg="white"
				key={index}
			>
				<VStack align="start" spacing={4}>
					<Heading size="md" color="teal.600">
						{todo.title}
					</Heading>
					<Text color="gray.600">{todo.description}</Text>
					<Text
						fontSize="sm"
						color={todo.status ? 'green.500' : 'red.500'}
					>
						{todo.status ? 'Completed' : 'Pending'}
					</Text>
					<Box>
						{todo?.tags.map((tag, index) => (
							<Badge
								key={index}
								borderRadius="full"
								px={2}
								mr={2}
								colorScheme="teal"
							>
								{tag}
							</Badge>
						))}
					</Box>
				</VStack>
			</Box>
			))}

			<EditTodo handleRefresh={handleRefresh} />
		</>
	);
};

export default Todos;
