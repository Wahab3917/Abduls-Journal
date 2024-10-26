import { Client, Account, OAuthProvider } from 'appwrite'
import config from '../config/config'

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  loginWithGoogle = async () => {
    try {
      await this.account.createOAuth2Session(OAuthProvider.Google, 'http://localhost:5173')
    } catch (error) {
      console.error(error)
    }
  }

  getUser = async () => {
    try {
      return await this.account.get()
    } catch (error) {
      console.error(error)
    }

    return null;
  }

  logoutUser = async () => {
    try {
      await this.account.deleteSessions()
    } catch (error) {
      console.error(error)
    }
  }
}

const authService = new AuthService();
export default authService