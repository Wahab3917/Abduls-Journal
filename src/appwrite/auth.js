import { Client, Account, OAuthProvider } from 'appwrite'
import config from '../config/config'
import { login, logout } from '../store/authSlice'

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  loginWithGoogle = async (dispatch) => {
    try {
      await this.account.createOAuth2Session(OAuthProvider.Google, 'http://localhost:5173');
      const userData = await this.account.get();
      console.log('Fetched userData:', userData);
      if (userData) {
        dispatch(login({ userData }));
        console.log('Dispatched login action with payload:', { userData });
      }
    } catch (error) {
      console.error('Error during loginWithGoogle:', error);
    }
  }

  getUser = async () => {
    try {
      return await this.account.get()
    } catch (error) {
      console.error('Error during getUser:', error);
    }

    return null;
  }

  logoutUser = async (dispatch) => {
    try {
      await this.account.deleteSessions();
      dispatch(logout());
    } catch (error) {
      console.error('Error during logoutUser:', error);
    }
  }
}

const authService = new AuthService();
export default authService