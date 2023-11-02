// To authenticate and generate JWT
export interface IUser {
  fullname: string;
  email: string;
  password: string;
}
// User's Goals
export interface IGoal {
  _id: string;
  user_id: string; // from JWT, ObjectId()
  title: string;
  description: string;
  deadline: number; // timestamp
  steps: IStep[];
}

export interface IStep {
  _id: string;
  title: string;
  description: string;
  status: string;
  deadline: number; // timestamp
}
