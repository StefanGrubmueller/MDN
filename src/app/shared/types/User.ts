export type User = {
  id: string;
  email: string;
  password: string;
  userName: string;
  firstName?: string;
  sureName?: string;
  friends?: Array<string>;
};

export type FirebaseAuthUser = {
  username: string;
  email: string;
  password: string;
};
