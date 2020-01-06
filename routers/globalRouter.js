import express from "express";
import routes from "./routes";
import { home, search } from "../controllers/videoController";
import {
  join,
  postJoin,
  login,
  postLogin,
  logout
} from "../controllers/userController";

const globalRouter = express.Router();

//Router.get(url, )
globalRouter.get(routes.home, home);

//하나의 routes.join rul에 get/post방식에 따라 각기 다른 사이트로 이동.
globalRouter.get(routes.join, join);

// action post요청에 대한 응답. join.pug form참조
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, login);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

export default globalRouter;
