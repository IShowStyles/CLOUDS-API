export type signupLocalType = {
  email: string;
  tokens: {
    access_token: string;
    refresh_token: string;
  }
  isActive: boolean;
}