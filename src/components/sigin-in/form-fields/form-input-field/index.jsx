'use client';
import React from 'react';
import { FormControl, Input, FormErrorMessage } from '@chakra-ui/react';

const FormInputField = ({ id, type, placeholder, register, errors, validation }) => {
    return (
        <FormControl id={id} isInvalid={errors[id]}>
            <Input
                type={type}
                {...register(id, validation)}
                placeholder={placeholder}
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                    color: 'gray.500',
                }}
            />
            {errors[id] && (
                <FormErrorMessage>
                    {errors[id].message}
                </FormErrorMessage>
            )}
        </FormControl>
    );
};

export default FormInputField;