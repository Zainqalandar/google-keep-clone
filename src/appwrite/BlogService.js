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
    async createBlog(title, content, tags = [], status, slug, coverImageId) {
        console.log(title, content, tags, status, slug, coverImageId);
        const authorId = localStorage.getItem('userId');
        try {
            const response = await this.databases.createDocument(
                config.databaseId,
                config.collectionBlogId,
                slug,
                {
                    title,
                    content,
                    authorId,
                    tags,
                    status,
                    coverImageId
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
            console.log("Appwrite serive :: getPost :: error", error);
            return false;
        }
    }


    async getBlogs(queries = [Query.equal("title", "content")]) {
        try {
            return await this.databases.listDocuments(
                config.databaseId,
                config.collectionTaskId,  // collection id
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    async uploadBlogFile(file){
        try {
            return await this.bucket.createFile(
                config.storageBlogId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }
    async getBlogFile(fileId){
        try {
            return await this.bucket.getFilePreview(config.storageBlogId,fileId)
        } catch (error) {
            console.log("Appwrite serive :: getFile :: error", error);
            return false
        }
    }
}

const blogService = new BlogService();

export default blogService;
