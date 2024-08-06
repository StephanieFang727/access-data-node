import { Context } from "koa";
import User, { IUser } from "../model/userModel";

export const getUsers = async () => {
  // console.log("getUsers");
  const users = await User.find({});
  return users;
};

export const createUser = async (name: string, email: string) => {
  const user: IUser = new User({ name, email });
  const insertData = await user.save();
  return insertData;
};
