'use client';
import React from 'react';
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
import { Link } from '@chakra-ui/next-js';
import authService from '@/appwrite/auth';
import { useForm } from 'react-hook-form';
// import { useNotification } from '@/provider/context/NotificationProvider';
import { useRouter } from 'next/navigation'
import { useNotification } from '@/lib/provider/context/NotificationProvider';

const SignUp = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const notify = useNotification();
	const router = useRouter()

	const onSubmit =async (data) => {
    try {
     const isCreatedSuccess =  authService.createAccount(data.email, data.password, data.username);
      if (isCreatedSuccess) {
        console.log('Account created successfully');
		router.push('/sign-in');
		notify('Account created successfully', 'success', 3000);
      }
    } catch (error) {
      console.error(error);
	  notify(`${error.message}`, 'error', 3000);
    }
  }

	return (
		<Box
			maxW="md"
			mx="auto"
			mt={8}
			p={6}
			borderWidth={1}
			borderradius="lg"
			boxShadow="lg"
		>
			<Image
				margin="10px auto"
				src="/google-keep.png"
				alt="Logo"
				boxSize="48px"
			/>
			<Heading as="h2" size="xl" textAlign="center" mb={6}>
				Sign Up
			</Heading>
			<VStack spacing={4}>
				<FormControl
					id="username"
					isRequired
					isInvalid={errors.username}
				>
					<FormLabel>Username</FormLabel>
					<Input
						{...register('username', {
							required: 'Username is required',
						})}
						type="text"
						placeholder="Enter your username"
					/>
					{errors.username && (
						<FormErrorMessage>
							{errors.username.message}
						</FormErrorMessage>
					)}
				</FormControl>
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
				>
					Sign Up
				</Button>
				<Text mt={4} textAlign="center">
					If you already have an account, please{' '}
					<Link color="teal.500" href="/sign-in">
						sign in
					</Link>
					.
				</Text>
			</VStack>
		</Box>
	);
};

export default SignUp;
