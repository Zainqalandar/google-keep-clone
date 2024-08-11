'use client';
import React, { useState } from 'react';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Heading,
	VStack,
	Text,
	FormErrorMessage,
	Image,
} from '@chakra-ui/react';
import authService from '@/appwrite/auth';
import { Link } from '@chakra-ui/next-js';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/lib/provider/context/NotificationProvider';

const SignIn = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const router = useRouter();
	const notify = useNotification();
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			let isLoginSuccess = await authService.login(
				data.email,
				data.password
			);
			if (isLoginSuccess) {
				console.log('Login successfully', isLoginSuccess);
				const token = isLoginSuccess.$id; // Retrieve the session ID token
				// document.cookie =await `session_token=${token}; path=/; secure; HttpOnly; SameSite=Strict`;
				const userId = isLoginSuccess.userId;
				const email = isLoginSuccess.providerUid;
				localStorage.setItem('userId', userId);
				localStorage.setItem('user_email', email);
				notify('Login successfully', 'success', 3000);
				router.push('/');
			}
		} catch (error) {
			console.error('Error occure in login :: ', error);
			notify(`${error.message}`, 'error', 3000);
		} finally {
			setLoading(false);
		}
	};
	return (
		<Box
			maxW="md"
			mx="auto"
			mt={8}
			p={6}
			borderWidth={1}
			borderRadius="lg"
			boxShadow="lg"
		>
			<Image
				margin="10px auto"
				src="/google-keep.png"
				alt="Logo"
				boxSize="48px"
			/>
			<Heading as="h2" size="xl" textAlign="center" mb={6}>
				Sign In
			</Heading>
			<VStack spacing={4}>
				<FormControl id="email" isRequired isInvalid={errors.email}>
					<FormLabel>Email</FormLabel>
					<Input
						{...register('email', {
							required: 'Email field is required',
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: 'Invalid email format',
							},
						})}
						type="email"
						placeholder="Enter your email"
					/>
					{errors.email && (
						<FormErrorMessage>
							{errors.email.message}
						</FormErrorMessage>
					)}
				</FormControl>
				<FormControl
					id="password"
					isRequired
					isInvalid={errors.password}
				>
					<FormLabel>Password</FormLabel>
					<Input
						{...register('password', {
							required: 'Password is required',
							minLength: {
								value: 8,
								message:
									'Password must be at least 8 characters long',
							},
							// pattern: {
							// 	value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
							// 	message:
							// 		'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
							// },
						})}
						type="password"
						placeholder="Enter your password"
					/>
					{errors.password && (
						<FormErrorMessage>
							{errors.password.message}
						</FormErrorMessage>
					)}
				</FormControl>
				<Button
					onClick={handleSubmit(onSubmit)}
					colorScheme="teal"
					width="full"
					mt={4}
					isLoading={loading}
				>
					Sign In
				</Button>
				<Text mt={4} textAlign="center">
					If you don&apos;t have an account,{' '}
					<Link color="teal.500" href="/sign-up">
						sign up
					</Link>{' '}
					first.
				</Text>
			</VStack>
		</Box>
	);
};

export default SignIn;
