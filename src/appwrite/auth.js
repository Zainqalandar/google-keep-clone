import { Client, Account, ID } from "appwrite";
import config from "@/conf/config";

class AuthService {
    client = new Client()
    account;
  constructor() {
    this.client
    .setEndpoint(config.appwriteUrl)
    .setProject(config.projectId);
    this.account = new Account(this.client);
  }

  async createAccount(email, password, name) {
    try {
       const userAccount  = await this.account.create(ID.unique(), email, password, name);
    //    if (userAccount) {
        
    //    }
    return userAccount;
        
    } catch (error) {
      throw error;
        
    }

  }
  async login(email, password) {
    try {
      const userAccount = await this.account.createEmailPasswordSession(email, password);
      return userAccount;
    } catch (error) {
      throw error;
    }
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