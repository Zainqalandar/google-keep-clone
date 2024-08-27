'use client';
import React, { useState } from 'react';
import {
	Box,
	SimpleGrid,
	GridItem,
	Heading,
	Text,
	chakra,
	Stack,
	FormControl,
	FormLabel,
	InputGroup,
	InputLeftAddon,
	Input,
	Textarea,
	FormHelperText,
	Flex,
	Avatar,
	Button,
	Divider,
	Select,
	VisuallyHidden,
	Icon,
	RadioGroup,
	Radio,
	Checkbox,
	Image,
} from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';

const NewEditor = () => {
	const [selectedImage, setSelectedImage] = useState(null);

	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			setSelectedImage(URL.createObjectURL(file));
		}
	};

	const removeImage = () => {
		setSelectedImage(null);
	};

    console.log('selectedImage', selectedImage)

	return (
		<Box
			border="1px solid #e2e8f0"
			bg="#edf3f8"
			_dark={{
				bg: 'gray.800',
			}}
			p={10}
		>
			<Box>
				<SimpleGrid
					display={{
						base: 'initial',
						md: 'grid',
					}}
					columns={{
						md: 3,
					}}
					spacing={{
						md: 6,
					}}
				>
					<GridItem
						colSpan={{
							md: 1,
						}}
					>
						<Box px={[4, 0]}>
							<Heading
								fontSize="lg"
								fontWeight="md"
								lineHeight="6"
							>
								Profile
							</Heading>
							<Text
								mt={1}
								fontSize="sm"
								color="gray.600"
								_dark={{
									color: 'gray.400',
								}}
							>
								This information will be displayed publicly so
								be careful what you share.
							</Text>
						</Box>
					</GridItem>
					<GridItem
						mt={[5, null, 0]}
						colSpan={{
							md: 2,
						}}
					>
						<chakra.form
							method="POST"
							shadow="base"
							rounded={[null, 'md']}
							overflow={{
								sm: 'hidden',
							}}
						>
							<Stack
								px={4}
								py={5}
								bg="white"
								_dark={{
									bg: '#141517',
								}}
								spacing={6}
								p={{
									sm: 6,
								}}
							>
								<FormControl as={GridItem} colSpan={[6, 3]}>
									<FormLabel
										htmlFor="first_name"
										fontSize="sm"
										fontWeight="md"
										color="gray.700"
										_dark={{
											color: 'gray.50',
										}}
									>
										Title
									</FormLabel>
									<Input
										type="text"
										placeholder="Title"
										name="first_name"
										id="first_name"
										autoComplete="given-name"
										mt={1}
										focusBorderColor="brand.400"
										shadow="sm"
										size="sm"
										w="full"
										rounded="md"
									/>
								</FormControl>

								<div>
									<FormControl id="email" mt={1}>
										<FormLabel
											fontSize="sm"
											fontWeight="md"
											color="gray.700"
											_dark={{
												color: 'gray.50',
											}}
										>
											Description
										</FormLabel>
										<Textarea
											placeholder="Brief description for your Blog."
											mt={1}
											rows={3}
											shadow="sm"
											focusBorderColor="brand.400"
											fontSize={{
												sm: 'sm',
											}}
										/>
										<FormHelperText>
											Brief description for your profile.
											URLs are hyperlinked.
										</FormHelperText>
									</FormControl>
								</div>

								<Box mt={4} maxW={500}>
									<FormControl as={GridItem} colSpan={[6, 3]}>
										<FormLabel
											htmlFor="country"
											fontSize="sm"
											fontWeight="md"
											color="gray.700"
											_dark={{
												color: 'gray.50',
											}}
										>
											Technologies
										</FormLabel>
										<Select
											id="country"
											name="country"
											autoComplete="country"
											placeholder="Select option"
											mt={1}
											focusBorderColor="brand.400"
											shadow="sm"
											size="sm"
											w="full"
											rounded="md"
										>
											<option>United States</option>
											<option value="react js">
												React js
											</option>
											<option value="node js">
												Node js
											</option>
											<option value="express js">
												Express js
											</option>
											<option value="mongo db">
												Mongo db
											</option>
											<option value="firebase">
												Firebase
											</option>
											<option value="flutter">
												Flutter
											</option>
											<option value="react native">
												React Native
											</option>
											<option value="python">
												Python
											</option>
											<option value="django">
												Django
											</option>
											<option value="flask">Flask</option>
											<option value="java">Java</option>
											<option value="spring boot">
												Spring Boot
											</option>
											<option value="php">PHP</option>
											<option value="laravel">
												Laravel
											</option>
											<option value="codeigniter">
												Codeigniter
											</option>
											<option value="ruby">Ruby</option>
											<option value="ruby on rails">
												Ruby on Rails
											</option>
											<option value="angular">
												Angular
											</option>
										</Select>
									</FormControl>
								</Box>

								<FormControl>
									<FormLabel
										fontSize="sm"
										fontWeight="md"
										color="gray.700"
										_dark={{
											color: 'gray.50',
										}}
									>
										Cover photo
									</FormLabel>
									<Flex
										mt={1}
										justify="center"
										px={6}
										pt={5}
										pb={6}
										borderWidth={2}
										_dark={{
											color: 'gray.500',
										}}
										borderStyle="dashed"
										rounded="md"
									>
										<Stack spacing={4} textAlign="center">
											{selectedImage ? (
												<Box>
													<Image
														src={selectedImage}
														alt="Selected Image"
														mx="auto"
														boxSize="150px"
														objectFit="cover"
														borderRadius="md"
													/>
													<Button
														mt={2}
														size="sm"
														colorScheme="red"
														onClick={removeImage}
													>
														Remove
													</Button>
												</Box>
											) : (
												<Stack
													spacing={1}
													textAlign="center"
												>
													<Icon
														mx="auto"
														boxSize={12}
														color="gray.400"
														_dark={{
															color: 'gray.500',
														}}
														stroke="currentColor"
														fill="none"
														viewBox="0 0 48 48"
														aria-hidden="true"
													>
														<path
															d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
															strokeWidth="2"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</Icon>
													<Flex
														fontSize="sm"
														color="gray.600"
														_dark={{
															color: 'gray.400',
														}}
														alignItems="baseline"
													>
														<chakra.label
															htmlFor="file-upload"
															cursor="pointer"
															rounded="md"
															fontSize="md"
															color="brand.600"
															_dark={{
																color: 'brand.200',
															}}
															pos="relative"
															_hover={{
																color: 'brand.400',
																_dark: {
																	color: 'brand.300',
																},
															}}
														>
															<span>
																Upload a file
															</span>
															<VisuallyHidden>
																<input
																	id="file-upload"
																	name="file-upload"
																	type="file"
																	onChange={
																		handleImageUpload
																	}
																/>
															</VisuallyHidden>
														</chakra.label>
														<Text pl={1}>
															or drag and drop
														</Text>
													</Flex>
													<Text
														fontSize="xs"
														color="gray.500"
														_dark={{
															color: 'gray.50',
														}}
													>
														PNG, JPG, GIF up to 10MB
													</Text>
												</Stack>
											)}
										</Stack>
									</Flex>
								</FormControl>
							</Stack>
							<Box
								px={{
									base: 4,
									sm: 6,
								}}
								py={3}
								bg="gray.50"
								_dark={{
									bg: '#121212',
								}}
								textAlign="right"
							>
								<Button
									type="submit"
									colorScheme="brand"
									_focus={{
										shadow: '',
									}}
									fontWeight="md"
								>
									Publish Post
								</Button>
							</Box>
						</chakra.form>
					</GridItem>
				</SimpleGrid>
			</Box>
		</Box>
	);
};

export default NewEditor;
