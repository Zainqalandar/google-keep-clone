'use client'
import Blogs from '@/components/blogs';
import {Box} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchPublishBlogs} from "@/store/featureBlogs";


const MyBlogs = () => {
    const dispatch = useDispatch();

    const {loading, blogs, error} = useSelector((state) => state.blog.publish);
    useEffect(() => {
        dispatch(fetchPublishBlogs());
    }, [dispatch]);


    return (
        <>
            <Box width="80%">
                <Blogs loading={loading} blogs={blogs} />
            </Box>
        </>
    );
};

export default MyBlogs;
