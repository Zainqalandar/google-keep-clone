import BlogEditor from '@/components/ui/BlogEditor';
import React from 'react';

const Edit = ({ params }) => {
	return (
		<>
			<BlogEditor blogId={params.id} />
		</>
	);
};

export default Edit;
