'use client';
import React, { useState } from 'react';
import {
	Box,
	Stack,
	Input,
	Button,
	FormErrorMessage,
	FormControl,
	Text,
} from '@chakra-ui/react';
import authService from '@/appwrite/auth';
import { Link } from '@chakra-ui/next-js';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/lib/provider/context/NotificationProvider';
import { useDispatch } from 'react-redux';
import FormFieldsContent from '@/components/sigin-in/form-fields/form-fields-content';

const FormFieldSignUp = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const router = useRouter();
	const notify = useNotification();

	const onSubmit = async (data) => {
		try {
			const isCreatedSuccess = authService.createAccount(
				data.email,
				data.password,
				data.username
			);
			if (isCreatedSuccess) {
				console.log('Account created successfully');
				router.push('/sign-in');
				notify('Account created successfully', 'success', 3000);
			}
		} catch (error) {
			console.error(error);
			notify(`${error.message}`, 'error', 3000);
		}
	};

	return (
		<Stack
			bg={'gray.50'}
			rounded={'xl'}
			p={{ base: 4, sm: 6, md: 8 }}
			spacing={{ base: 8 }}
			maxW={{ lg: 'lg' }}
		>
			<FormFieldsContent />
			<Box as={'form'} mt={10}>
				<Stack spacing={4}>
					<FormControl id="username" isInvalid={errors.username}>
						<Input
							type="text"
							{...register('username', {
								required: 'Username is required',
							})}
							placeholder="Username"
							bg={'gray.100'}
							border={0}
							color={'gray.500'}
							_placeholder={{
								color: 'gray.500',
							}}
						/>
						{errors.username && (
							<FormErrorMessage>
								{errors.username.message}
							</FormErrorMessage>
						)}
					</FormControl>
					<FormControl id="email" isInvalid={errors.email}>
						<Input
							type="email"
							{...register('email', {
								required: 'Email field is required',
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: 'Invalid email format',
								},
							})}
							placeholder="Email address"
							bg={'gray.100'}
							border={0}
							color={'gray.500'}
							_placeholder={{
								color: 'gray.500',
							}}
						/>
						{errors.email && (
							<FormErrorMessage>
								{errors.email.message}
							</FormErrorMessage>
						)}
					</FormControl>

					<FormControl id="password" isInvalid={errors.password}>
						<Input
							type="password"
							{...register('password', {
								required: 'Password is required',
								minLength: {
									value: 8,
									message:
										'Password must be at least 8 characters long',
								},
							})}
							placeholder="********"
							bg={'gray.100'}
							border={0}
							color={'gray.500'}
							_placeholder={{
								color: 'gray.500',
							}}
						/>
						{errors.password && (
							<FormErrorMessage>
								{errors.password.message}
							</FormErrorMessage>
						)}
					</FormControl>
					<Button
						fontFamily={'heading'}
						bg={'gray.200'}
						color={'gray.800'}
					>
						Upload CV
					</Button>
				</Stack>
				<Button
					isDisabled={
						errors.email || errors.password || errors.username
					}
					type="submit"
					isLoading={loading}
					loadingText="Submitting..."
					onClick={handleSubmit(onSubmit)}
					fontFamily={'heading'}
					mt={8}
					w={'full'}
					bgGradient="linear(to-r, red.400,pink.400)"
					color={'white'}
					_hover={{
						bgGradient: 'linear(to-r, red.400,pink.400)',
						boxShadow: 'xl',
					}}
				>
					Submit
				</Button>
				<Box textAlign="center" mt={4}>
					<Text color={'gray.500'}>Already have an account?</Text>

					<Link href={'/sign-in'} color={'gray.500'}>
						&#160; Sign In
					</Link>
				</Box>
			</Box>
			form
		</Stack>
	);
};

export default FormFieldSignUp;
