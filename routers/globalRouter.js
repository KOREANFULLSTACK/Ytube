import express from "express";
import routes from "./routes";
import { home, search } from "../controllers/videoController";
import {
  join,
  postJoin,
  login,
  postLogin,
  logout,
  githubLogin,
  githubCallback,
  postGithubLogin
} from "../controllers/userController";
import { onlyPublic } from "../middlewares";
import passport from "passport";

const globalRouter = express.Router();

//Router.get(url, controller 이때 controller에는 url에 걸맞게 웹브라우저 폼을 형성하는 함수와 pug로 안내한다. )
globalRouter.get(routes.home, home);

//하나의 routes.join rul에 get/post방식에 따라 각기 다른 사이트로 이동.
globalRouter.get(routes.join, join);

// action post요청에 대한 응답. join.pug form참조
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, login);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  githubCallback,
  postGithubLogin
);

export default globalRouter;
