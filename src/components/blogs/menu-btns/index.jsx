import { useDispatch } from 'react-redux';
import {
	MenuButton,
	MenuList,
	MenuItem,
	Menu,
	IconButton,
	Box,
} from '@chakra-ui/react';
import blogService from '@/appwrite/BlogService';
import { FiEdit, FiCopy } from 'react-icons/fi';
import { LuArchiveRestore } from "react-icons/lu";
import { HiArchiveBoxXMark } from 'react-icons/hi2';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useNotification } from '@/lib/provider/context/NotificationProvider';
import { useRouter } from 'next/navigation';
import ConfirmationDeletePopup from '@/components/ui/ConfirmationDeletePopup';
import { fetchPublishBlogs } from '@/store/featureBlogs';
import { RiDeleteBin3Line } from "react-icons/ri";
import { MdOutlineRestoreFromTrash } from "react-icons/md";


const MenuButtons = ({ blogId, blogFileId, userId, isArchived, isDeleted }) => {
	const router = useRouter();

	const notify = useNotification();
	const dispatch = useDispatch();

	const handleDelete = async (blogId, blogFileId) => {
		try {
			await blogService.deleteBlog(blogId);
			await blogService.deleteBlogFile(blogFileId);
			notify('Blog deleted successfully', 'success');
			dispatch(fetchPublishBlogs(userId));
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
				{( !isArchived && !isDeleted ) && <MenuItem
					onClick={() => router.push(`/edit/${blogId}`)}
					icon={<Box as={FiEdit} boxSize={4} />}
				>
					Edit
				</MenuItem>}
				<MenuItem 
				// icon={<FiCopy />}
				icon={<Box as={FiCopy} boxSize={4} />}
				>Duplicate</MenuItem>
				{( !isArchived && !isDeleted ) && <MenuItem
					onClick={() => router.push(`/edit/${blogId}`)}
					icon={<Box as={HiArchiveBoxXMark} boxSize={4} />}
				>
					Archive
				</MenuItem>}
				{( isArchived && !isDeleted ) && <MenuItem
					// onClick={() => router.push(`/edit/${blogId}`)}
					icon={<Box as={HiArchiveBoxXMark} boxSize={4} />}
				>
					Unarchive
				</MenuItem>}
				{( !isArchived && isDeleted ) && <MenuItem
					// onClick={() => router.push(`/edit/${blogId}`)}
					icon={<Box as={MdOutlineRestoreFromTrash} boxSize={5} />}
				>
					Restore
				</MenuItem>}
				{( !isArchived && !isDeleted ) && <MenuItem
					// onClick={() => router.push(`/edit/${blogId}`)}
					icon={<Box as={RiDeleteBin3Line} boxSize={4} />}
				>
					Move to bin
				</MenuItem>}
				{( !isArchived && isDeleted ) && <ConfirmationDeletePopup
					blogId={blogId}
					blogFileId={blogFileId}
					onHandleDelete={handleDelete}
					isArchived={isArchived}
				/>}
			</MenuList>
		</Menu>
	);
};

export default MenuButtons;
