'use client';
import { useEffect } from "react";
import Blogs from "../blogs";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublishBlogs } from "@/store/featureBlogs";
import { usePathname } from "next/navigation";


const Published = () => {
    const dispatch = useDispatch();
    const { loading, error, blogs } = useSelector(
		(state) => state.blog.publish
	);
    const userDetail = useSelector(
		(state) => state.user.userData
	);

    let isPersonalUrl = usePathname();



	useEffect(() => {
        const userId = isPersonalUrl === '/my-blogs'? userDetail.$id : null;
		dispatch(fetchPublishBlogs(userId));
	}, [dispatch]);


    return (
        <Blogs blogs={blogs} loading={loading} error={error} />
    )
}

export default Published