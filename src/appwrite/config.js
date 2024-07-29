import { Client, ID, Databases, Storage, Query } from 'appwrite';
import config from '@/conf/config';

class Service {
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
    async createTodo(title, description, status, tags) {
        console.log(title, description, status, tags);
        try {
            const response = await this.databases.createDocument(
                config.databaseId,
                config.collectionId,
                ID.unique(),
                {
                    title,
                    description,
                    status,
                    tags,
                }
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getTodos(queries = [Query.equal("title", "description")]) {
        try {
            return await this.databases.listDocuments(
                config.databaseId,
                config.collectionId,  // collection id
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }
}

const service = new Service();

export default service;
