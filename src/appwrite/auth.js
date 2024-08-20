import config from '@/lib/conf/config';
import { Client, Account, ID } from 'appwrite';

class AuthService {
	client = new Client();
	account;
	constructor() {
		this.client
			.setEndpoint(config.appwriteUrl)
			.setProject(config.projectId);
		this.account = new Account(this.client);
	}

	async createAccount(email, password, name) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				email,
				password,
				name
			);
			return userAccount;
		} catch (error) {
			throw error;
		}
	}
	async login(email, password) {
		try {
			const userAccount = await this.account.createEmailPasswordSession(
				email,
				password
			);
			return userAccount;
		} catch (error) {
			throw error;
		}
	}

	// async getCurrentUser() {
	// 	try {
	// 		return await this.account.get();
	// 	} catch (error) {
	// 		console.log('Appwrite serive :: getCurrentUser :: error', error);
	// 	}
	// }

	getCurrentUser() {
		return this.account.get();
	}

	async logout() {
		try {
			await this.account.deleteSessions();
		} catch (error) {
			throw error;
		}
	}
}

const authService = new AuthService();

export default authService;
