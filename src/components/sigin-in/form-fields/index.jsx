'use client';
import React, { useState } from 'react';
import {
	Box,
	Stack,
	Input,
	Button,
	FormErrorMessage,
	FormControl,
	FormLabel,
} from '@chakra-ui/react';
import FormFieldsContent from './form-fields-content';
import authService from '@/appwrite/auth';
import { Link } from '@chakra-ui/next-js';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/lib/provider/context/NotificationProvider';
import { getUserDetail } from '@/store/feature-user';
import { useDispatch } from 'react-redux';
import nookies from 'nookies';

const FormFields = () => {
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
		setLoading(true);
		console.log('data', data);
		try {
			let activeUserData = await authService.login(
				data.email,
				data.password
			);
			if (activeUserData) {
				authService.getCurrentUser().then((userData) => {
					if (userData) {
						nookies.set(null, 'userId', userData.$id, {
							path: '/',
						});
						dispatch(getUserDetail(userData));
						notify('Logged in successfully', 'success', 3000);
						router.push('/');
					} else {
						dispatch(getUserDetail({}));
					}
				});
			}
		} catch (error) {
			console.error('Error occure in login :: ', error);
			notify(`${error.message}`, 'error', 3000);
		} finally {
			setLoading(false);
		}
	};

	console.log('error', errors);
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
					isDisabled={errors.email || errors.password}
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
					<Link color={'gray.500'} href={'#'}>
						Forgot password?
					</Link>

					<Link href={'/sign-up'} color={'gray.500'}>
						&#160; Sign up
					</Link>
				</Box>
			</Box>
			form
		</Stack>
	);
};

export default FormFields;
