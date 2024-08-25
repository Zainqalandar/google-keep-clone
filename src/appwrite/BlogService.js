import config from '@/lib/conf/config';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

class BlogService {
	client = new Client();
	databases;
	bucket;
	constructor() {
		this.client
			.setEndpoint(config.appwriteUrl)
			.setProject(config.projectId);
		this.databases = new Databases(this.client);
		this.bucket = new Storage(this.client);
	}
	async createBlog({
		title,
		content,
		authorId,
		tags = [],
		status,
		slug,
		coverImageId,
		name,
	}) {
		

		try {
			const response = await this.databases.createDocument(
				config.databaseId,
				config.collectionBlogId,
				ID.unique(),
				{
					title,
					content,
					authorId,
					tags,
					status,
					coverImageId,
					name,
				}
			);
			return response;
		} catch (error) {
			throw error;
		}
	}
	async getBlog(slug) {
		try {
			return await this.databases.getDocument(
				config.databaseId,
				config.collectionBlogId,
				slug
			);
		} catch (error) {
			console.log('Appwrite serive :: getPost :: error', error);
			return false;
		}
	}

	async updateBlog(
		blogId,
		{ title, content, authorId, tags, status, coverImageId, name }
	) {
		console.log('UpdateBlog ::', {
			title,
			content,
			authorId,
			tags,
			status,
			coverImageId,
			name,
			is_deleted: false,
			is_archived: false,
		});
		try {
			return await this.databases.updateDocument(
				config.databaseId,
				config.collectionBlogId,
				blogId,
				{
					title,
					content,
					authorId,
					tags,
					status,
					coverImageId,
					name,
				}
			);
		} catch (error) {
			console.log('Appwrite serive :: updatePost :: error', error);
			return false;
		}
	}

	async deleteBlog(blogId) {
		try {
			return await this.databases.deleteDocument(
				config.databaseId,
				config.collectionBlogId,
				blogId
			);
		} catch (error) {
			console.log('Appwrite serive :: deletePost :: error', error);
			return false;
		}
	}

	async getBlogs(queries) {
		try {
			return await this.databases.listDocuments(
				config.databaseId,
				config.collectionBlogId,
				queries
			);
		} catch (error) {
			console.log('Appwrite serive :: getPosts :: error', error);
			return false;
		}
	}

	async deleteBlogFile(fileId) {
		try {
			return await this.bucket.deleteFile(config.storageBlogId, fileId);
		} catch (error) {
			console.log('Appwrite serive :: deleteFile :: error', error);
			return false;
		}
	}

	async uploadBlogFile(file) {
		try {
			return await this.bucket.createFile(
				config.storageBlogId,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log('Appwrite serive :: uploadFile :: error', error);
			return false;
		}
	}
	getBlogFile(fileId) {
		return this.bucket.getFilePreview(config.storageBlogId, fileId);
	}
}

const blogService = new BlogService();

export default blogService;
