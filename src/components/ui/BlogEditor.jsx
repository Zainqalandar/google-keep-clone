'use client';
import React from 'react';
import {
	Box,
	Heading,
	Input,
	Textarea,
	Button,
	VStack,
	HStack,
	IconButton,
	Divider,
	Text,
	useColorModeValue,
	Select,
	FormLabel,
} from '@chakra-ui/react';
import { DeleteIcon, LinkIcon } from '@chakra-ui/icons';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles
import blogService from '@/appwrite/BlogService';
import { TiUpload } from 'react-icons/ti';
// import { Image } from '@chakra-ui/next-js';
import Image from 'next/image';

const BlogEditor = () => {
	const [fileImage, setFileImage] = React.useState(null);
	// Color Mode Values
	const bgColor = useColorModeValue('white', 'gray.800');
	const textColor = useColorModeValue('gray.700', 'gray.200');
	const accentColor = useColorModeValue('purple.600', 'purple.400');
	const inputBgColor = useColorModeValue('gray.50', 'gray.700');

	// Form Hook for handling form data
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		reset,
		setValue,
		file,
	} = useForm({
		defaultValues: {
			title: '',
			content: '',
			tags: [],
			status: 'published',
			file: null,
		},
	});

	function formatString(str) {
		return str.toLowerCase().replace(/ /g, '_');
	}

	// Submit Handler
	const onSubmit = async (data) => {
		console.log(data);
		if (data.file) {
			try {
				const res = await blogService.uploadBlogFile(data.file);
				const coverImageId = res.$id;
				data.coverImageId = coverImageId;
				data.slug = formatString(data.title);
				if (data.coverImageId) {
					console.log('data', data);
					try {
						await blogService.createBlog(
							data.title,
							data.content,
							data.tags,
							data.status,
							data.slug,
							data.coverImageId
						);
						reset();
					} catch (error) {
						console.error('Error creating blog post :: ', error);
					}
				}
			} catch (error) {
				console.error('Error uploading file :: ', error);
			}
		}
	};

	const getBlog = async (slug) => {
		try {
			const res = await blogService.getBlog(slug);
			if (res) {
				try {
					const coverImg = await blogService.getBlogFile(
						res.coverImageId
					);
					setFileImage(coverImg);
					console.log('res', {
						title: res.title,
						content: res.content,
						tags: res.tags,
						status: res.status,
					});
					reset({
						title: res.title,
						content: res.content,
						tags: res.tags,
						status: res.status,
					});
				} catch (error) {
					console.error('Error getting blog cover image :: ', error);
				}
			}
		} catch (error) {
			console.error('Error getting blog post :: ', error);
		}
	};


	return (
		<Box
			bg={bgColor}
			p={8}
			borderradius="md"
			boxShadow="xl"
			maxW="1200px"
			mx="auto"
			my={10}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* Editor Header */}
				<VStack spacing={6} align="start" mb={6}>
					<Heading size="2xl" color={accentColor}>
						Create a New Blog Post
					</Heading>
					<Input
						placeholder="Enter Blog Title"
						size="lg"
						bg={inputBgColor}
						borderColor={textColor}
						color={textColor}
						{...register('title', {
							required: 'Title field is required',
							maxLength: {
								value: 100,
								message:
									'Title should not exceed 100 characters',
							},
							validate: {
								noNumbers: (value) =>
									/^[^\d]*$/.test(value) ||
									'Title cannot contain numbers',
							},
						})}
					/>
					{errors?.title && (
						<Text color="red.500" fontSize="sm">
							{errors.title.message}
						</Text>
					)}
				</VStack>

				<Divider my={6} />

				{/* Formatting Toolbar */}
				<HStack spacing={4} mb={6}>
					<IconButton
						icon={<FaBold />}
						aria-label="Bold text"
						size="lg"
						colorScheme="blue"
						variant="outline"
					/>
					<IconButton
						icon={<FaItalic />}
						aria-label="Italic text"
						size="lg"
						colorScheme="blue"
						variant="outline"
					/>
					<IconButton
						icon={<FaUnderline />}
						aria-label="Underline text"
						size="lg"
						colorScheme="blue"
						variant="outline"
					/>
					<IconButton
						icon={<LinkIcon />}
						aria-label="Add link"
						size="lg"
						colorScheme="blue"
						variant="outline"
					/>
					<Select
						placeholder="Heading"
						size="lg"
						color={textColor}
						bg={inputBgColor}
						borderColor={textColor}
					>
						<option>Heading 1</option>
						<option>Heading 2</option>
						<option>Heading 3</option>
					</Select>
				</HStack>

				{/* Content Area */}
				<Textarea
					hidden={true}
					placeholder="Start writing your blog post here..."
					size="lg"
					rows={10}
					bg={inputBgColor}
					borderColor={textColor}
					color={textColor}
					{...register('content', {
						required: 'Content field is required',
						maxLength: {
							value: 2000,
							message:
								'Content should not exceed 2000 characters',
						},
					})}
				/>
				{errors?.content && (
					<Text hidden={true} color="red.500" fontSize="sm">
						{errors.content.message}
					</Text>
				)}

				<Box
					bg={inputBgColor}
					borderColor={textColor}
					borderWidth="1px"
					borderradius="md"
					p={4}
				>
					<ReactQuill
						theme="snow"
						placeholder="Start writing your blog post here..."
						value={watch().content}
						onChange={(value) => setValue('content', value)}
					/>
				</Box>
				{errors?.content && (
					<Text color="red.500" fontSize="sm">
						{errors.content.message}
					</Text>
				)}

				<Divider my={6} />

				{/* Tags and Status Fields */}
				<HStack spacing={6} mb={6}>
					<Box flex={1}>
						<FormLabel>Tags</FormLabel>
						<Select
							placeholder="Select tags"
							size="lg"
							color={textColor}
							bg={inputBgColor}
							borderColor={textColor}
							value={watch().tags[0]}
							onChange={(e) => {
								const value = e.target.value;
								setValue('tags', [value]);
							}}
						>
							<option value="next.js">Next.js</option>
							<option value="react.js">React.js</option>
							<option value="appwrite">Appwrite</option>
						</Select>
						{errors?.tags && (
							<Text color="red.500" fontSize="sm">
								{errors.tags.message}
							</Text>
						)}
					</Box>

					<Box flex={1}>
						<FormLabel>Status</FormLabel>
						<Select
							placeholder="Select status"
							size="lg"
							color={textColor}
							bg={inputBgColor}
							borderColor={textColor}
							{...register('status', {
								required: 'Status field is required',
							})}
						>
							<option value="draft">Draft</option>
							<option value="published">Published</option>
							<option value="archived">Archived</option>
						</Select>
						{errors?.status && (
							<Text color="red.500" fontSize="sm">
								{errors.status.message}
							</Text>
						)}
					</Box>
				</HStack>

				<Divider my={6} />

				<Box>
					<FormLabel>Upload File</FormLabel>
					<input
						type="file"
						onChange={(e) => setValue('file', e.target.files[0])}
					/>
					{errors?.file && (
						<Text color="red.500" fontSize="sm">
							{errors.file.message}
						</Text>
					)}
					<IconButton
						icon={<TiUpload />}
						aria-label="Upload file"
						size="lg"
						colorScheme="blue"
						variant="outline"
					/>
				</Box>

				{fileImage && (
					<Box>
						<FormLabel>Image</FormLabel>
						<Image
							src={
								fileImage
									? fileImage.href
									: '/dummy-post-horisontal-t.png'
							}
							alt="Blog Cover"
							borderradius="md"
							boxShadow="md"
							width={500}
							height={300}
							unoptimized // Disable the default Next.js image optimization
						/>
					</Box>
				)}

				{/* Preview Section */}
				<VStack align="start" spacing={4} mb={6}>
					<Heading size="lg" color={accentColor}>
						Preview
					</Heading>
					<Box
						bg={inputBgColor}
						p={6}
						borderradius="md"
						borderWidth="1px"
						borderColor={textColor}
						w="full"
					>
						<Heading size="lg" mb={4} color={textColor}>
							{watch().title}
						</Heading>
						<Box
							fontSize="lg"
							color={textColor}
							dangerouslySetInnerHTML={{
								__html: watch().content,
							}}
						/>
					</Box>
				</VStack>

				<Divider my={6} />

				{/* Action Buttons */}
				<HStack justify="space-between">
					<Button
						onClick={() => getBlog('66ba5dec00350b232bdc')}
						colorScheme="blue"
						size="lg"
						variant="outline"
					>
						Save Draft
					</Button>
					<Button type="submit" colorScheme="green" size="lg">
						Publish Post
					</Button>
					<IconButton
						icon={<DeleteIcon />}
						aria-label="Delete draft"
						size="lg"
						colorScheme="red"
						variant="outline"
						onClick={() => reset()}
					/>
				</HStack>
			</form>
		</Box>
	);
};

export default BlogEditor;
