import express from "express";
import routes from "./routes";
import { localsMiddleware, onlyPrivate } from "../middlewares";
import {
  users,
  userDetail,
  editProfile,
  changePassword,
  postEditProfile,
  postChangePassword
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.users, users);
userRouter.get(routes.userDetail(), onlyPrivate, userDetail);
userRouter.get(routes.editProfile(), onlyPrivate, editProfile);
userRouter.post(routes.editProfile(), onlyPrivate, postEditProfile);

userRouter.get(routes.changePassword(), onlyPrivate, changePassword);
userRouter.post(routes.changePassword(), onlyPrivate, postChangePassword);
export default userRouter;
