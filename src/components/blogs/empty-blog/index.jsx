'use client'
import {Button, Heading, Icon, VStack, Text} from "@chakra-ui/react";
import {FaBlog} from "react-icons/fa";
import {useRouter} from "next/navigation";


const EmptyBlog = ({type, text}) => {
    const router = useRouter();
    return (
        <>
            <VStack spacing={6} align="center" mt={10}>
                <Icon as={FaBlog} w={20} h={20} color="gray.400" />
                <Heading size="lg" color="gray.500">
                    {text}
                </Heading>
                <Text fontSize="md" color="gray.400" textAlign="center">
                    It looks like there are no blogs to display at the moment.
                </Text>
                {type ==='blog' && <Button onClick={() => router.push('/edit-notes')} colorScheme="teal" size="md" mt={4}>
                    Create Your First Blog
                </Button>}
            </VStack>
        </>
    )
}

export default EmptyBlog