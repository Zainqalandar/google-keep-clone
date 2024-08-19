'use client';
import React from 'react';
import {
	VStack,
	Button,
	CloseButton,
    useDisclosure,
    useColorModeValue,
} from '@chakra-ui/react';
import { AiFillHome, AiOutlineInbox } from 'react-icons/ai';
import { BsFillCameraVideoFill } from 'react-icons/bs';

const MobileNavContent = () => {
    const mobileNav = useDisclosure();
    
	const bg = useColorModeValue('white', 'gray.900');
    return (
        <VStack
            pos="absolute"
            top={0}
            left={0}
            right={0}
            display={mobileNav.isOpen ? 'flex' : 'none'}
            flexDirection="column"
            p={2}
            pb={4}
            m={2}
            bg={bg}
            spacing={3}
            rounded="sm"
            shadow="sm"
        >
            <CloseButton
                aria-label="Close menu"
                justifySelf="self-start"
                onClick={mobileNav.onClose}
            />
            <Button w="full" variant="ghost" leftIcon={<AiFillHome />}>
                Dashboard
            </Button>
            <Button
                w="full"
                variant="solid"
                colorScheme="brand"
                leftIcon={<AiOutlineInbox />}
            >
                Inbox
            </Button>
            <Button
                w="full"
                variant="ghost"
                leftIcon={<BsFillCameraVideoFill />}
            >
                Videos
            </Button>
        </VStack>
    );
};

export default MobileNavContent;