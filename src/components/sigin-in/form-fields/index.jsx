'use client';
import React, { useState } from 'react';
import {
	Box,
	Stack,
	Input,
	Button,
	FormErrorMessage,
	FormControl,
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
import FormInputField from './form-input-field';


const FormFields = () => {
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();
	const router = useRouter();
	const notify = useNotification();

	const onSubmit = async (data) => {
		setLoading(true);
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
					<FormInputField
						id="email"
						type="email"
						placeholder="Email address"
						register={register}
						errors={errors}
						validation={{
							required: 'Email field is required',
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: 'Invalid email format',
							},
						}}
					/>

					<FormInputField
						id="password"
						type="password"
						placeholder="********"
						register={register}
						errors={errors}
						validation={{
							required: 'Password is required',
							minLength: {
								value: 8,
								message:
									'Password must be at least 8 characters long',
							},
						}}
					/>
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
