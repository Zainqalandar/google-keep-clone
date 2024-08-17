'use client';
import React, { useState } from 'react';
import nookies from 'nookies';
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
import { getUserDetail } from '@/store/feature-user';
import { useDispatch } from 'react-redux';

const SignIn = () => {
	const dispatch = useDispatch();
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
			let activeUserData = await authService.login(
				data.email,
				data.password
			);
			if (activeUserData) {
				authService
					.getCurrentUser()
					.then((userData) => {
						if (userData) {
							nookies.set(null, 'userId', userData.$id, { path: '/' });
							dispatch(getUserDetail(userData));
							notify('Logged in successfully', 'success', 3000);
							router.push('/');
						} else {
							dispatch(getUserDetail({}));
						}
					})
			}
		} catch (error) {
			console.error('Error occure in login :: ', error);
			notify(`${error.message}`, 'error', 3000);
		} finally {
			setLoading(false);
		}
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			handleSubmit(onSubmit)();
		}
	};
	return (
		<Box height="100vh" display="flex" alignItems="center">
			<Box
				width="100%"
				maxW="600px"
				height="590px"
				mx="auto"
				p={6}
				borderWidth={1}
				borderradius="lg"
				boxShadow="lg"
				mt="-100px"
				// border='2px solid red'
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
					<FormControl
						maxW="600px"
						id="email"
						isRequired
						isInvalid={errors.email}
					>
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
							padding="26px 15px"
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
						maxW="600px"
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
							padding="26px 15px"
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
						loadingText="Signing In"
						isLoading={loading}
						maxW="600px"
						padding="26px 15px"
					>
						Sign In
					</Button>
					<Text mt={4} textAlign="center" fontSize="xl">
						If you don&apos;t have an account,{' '}
						<Link color="teal.500" href="/sign-up">
							sign up
						</Link>{' '}
						first.
					</Text>
				</VStack>
			</Box>
		</Box>
	);
};

export default SignIn;
