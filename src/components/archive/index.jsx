import EmptyBlog from "@/components/blogs/empty-blog";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchArchiveBlogs} from "@/store/featureBlogs";


const Archive = () => {
    const dispatch = useDispatch();

    const {loading, blogs, error} = useSelector((state) => state.blog.archive);
    useEffect(() => {
        dispatch(fetchArchiveBlogs());
    }, [dispatch]);
    return (
        <>
            <EmptyBlog type='archive' text='No Archive Blogs Available' />
        </>
    )
}

export default Archive