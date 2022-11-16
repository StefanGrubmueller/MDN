export type User = {
  id: string;
  email: string;
  password: string;
  userName: string;
  firstName?: string;
  sureName?: string;
  friends?: Array<string>
}
