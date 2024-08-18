import { Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';

const FormFieldsContent = () => {
	return (
		<Stack spacing={4}>
			<Heading
				color={'gray.800'}
				lineHeight={1.1}
				fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
			>
				Join our team
				<Text
					as={'span'}
					bgGradient="linear(to-r, red.400,pink.400)"
					bgClip="text"
				>
					!
				</Text>
			</Heading>
			<Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
				We’re looking for amazing engineers just like you! Become a part
				of our rockstar engineering team and skyrocket your career!
			</Text>
		</Stack>
	);
};

export default FormFieldsContent;
