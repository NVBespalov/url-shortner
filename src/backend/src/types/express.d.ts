declare namespace Express {
  interface User {
    userId: string;
  }
  
  export interface Request {
    user: User;
  }
}