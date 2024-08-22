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
import FormInputField from '@/components/sigin-in/form-fields/form-input-field';

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
					<FormInputField
						id="username"
						type="text"
						placeholder="Username"
						register={register}
						errors={errors}
						validation={{
							required: 'Username is required',
						}}
					/>

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
