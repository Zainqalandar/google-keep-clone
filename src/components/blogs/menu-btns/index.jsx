// 'use client';
import { useDispatch } from 'react-redux';
import {
	MenuButton,
	MenuList,
	MenuItem,
	Menu,
	IconButton,
} from '@chakra-ui/react';
import blogService from '@/appwrite/BlogService';
import { FiEdit, FiCopy } from 'react-icons/fi';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useNotification } from '@/lib/provider/context/NotificationProvider';
import { useRouter } from 'next/navigation';
import ConfirmationDeletePopup from '@/components/ui/ConfirmationDeletePopup';


const MenuButtons = ({blogId, blogFileId}) => {
	const router = useRouter();

	const notify = useNotification();
	const dispatch = useDispatch();


	const handleDelete = async (blogId, blogFileId) => {
		try {
			await blogService.deleteBlog(blogId);
			await blogService.deleteBlogFile(blogFileId);
			notify('Blog deleted successfully', 'success');
			dispatch(fetchBlogs());
		} catch (error) {
			console.log('MegaBlog :: handleDelete :: error', error);
			notify('Error deleting blog', 'error');
		}
	};
	return (
		<Menu>
			<MenuButton
				as={IconButton}
				icon={<BiDotsHorizontalRounded />}
				variant="ghost"
				aria-label="Options"
			/>
			<MenuList>
				<MenuItem
					onClick={() => router.push(`/edit/${blog?.$id}`)}
					icon={<FiEdit />}
				>
					Edit
				</MenuItem>
				<MenuItem icon={<FiCopy />}>Duplicate</MenuItem>
				<ConfirmationDeletePopup
					blogId={blogId}
					blogFileId={blogFileId}
					onHandleDelete={handleDelete}
				/>
			</MenuList>
		</Menu>
	);
};

export default MenuButtons;
