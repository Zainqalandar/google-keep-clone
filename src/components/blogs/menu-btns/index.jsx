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
import { HiArchiveBoxXMark } from 'react-icons/hi2';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useNotification } from '@/lib/provider/context/NotificationProvider';
import { useRouter } from 'next/navigation';
import ConfirmationDeletePopup from '@/components/ui/ConfirmationDeletePopup';
import { fetchArchiveBlogs, fetchBinBlogs, fetchPublishBlogs } from '@/store/featureBlogs';
import { RiDeleteBin3Line } from "react-icons/ri";
import { MdOutlineRestoreFromTrash } from "react-icons/md";


const MenuButtons = ({ blogId, blogFileId, userId, isArchived, isDeleted }) => {
	const router = useRouter();

	const notify = useNotification();
	const dispatch = useDispatch();

	

	const handleArchive = async (blogId) => {
		try {
			await blogService.archived(blogId);
			notify('Blog archived successfully', 'success');
			dispatch(fetchPublishBlogs(userId));
		} catch (error) {
			console.log('MegaBlog :: handleArchive :: error', error);
			notify('Error archiving blog', 'error');
		}
	};
	const handleUnarchive = async (blogId) => {
		try {
			await blogService.unarchived(blogId);
			notify('Blog unarchived successfully', 'success');
			dispatch(fetchArchiveBlogs(userId));
		} catch (error) {
			console.log('MegaBlog :: handleUnarchive :: error', error);
			notify('Error unarchiving blog', 'error');
		}
	};
	const handleMoveToBin = async (blogId) => {
		try {
			await blogService.moveToBin(blogId);
			notify('Blog moved to bin successfully', 'success');
			dispatch(fetchPublishBlogs(userId));
		} catch (error) {
			console.log('MegaBlog :: handleMoveToBin :: error', error);
			notify('Error moving blog to bin', 'error');
		}
	};

	const handleRestoreFromBin = async (blogId) => {
		try {
			await blogService.restoreFromBin(blogId);
			notify('Blog restored from bin successfully', 'success');
			dispatch(fetchBinBlogs(userId));
		} catch (error) {
			console.log('MegaBlog :: handleRestoreFromBin :: error', error);
			notify('Error restoring blog from bin', 'error');
		}
	};

	

	const handleDelete = async (blogId, blogFileId) => {
		try {
			await blogService.deleteBlog(blogId);
			await blogService.deleteBlogFile(blogFileId);
			notify('Blog deleted successfully', 'success');
			dispatch(fetchBinBlogs(userId));
		} catch (error) {
			console.log('MegaBlog :: handleDelete :: error', error);
			notify('Error deleting blog', 'error');
		}
	}
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
					onClick={() => handleArchive(blogId)}
					icon={<Box as={HiArchiveBoxXMark} boxSize={4} />}
				>
					Archive
				</MenuItem>}
				{( isArchived && !isDeleted ) && <MenuItem
					onClick={() => handleUnarchive(blogId)}
					icon={<Box as={HiArchiveBoxXMark} boxSize={4} />}
				>
					Unarchive
				</MenuItem>}
				{( !isArchived && isDeleted ) && <MenuItem
					onClick={() => handleRestoreFromBin(blogId)}
					icon={<Box as={MdOutlineRestoreFromTrash} boxSize={5} />}
				>
					Restore
				</MenuItem>}
				{( !isArchived && !isDeleted ) && <MenuItem
					onClick={() => handleMoveToBin(blogId)}
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
