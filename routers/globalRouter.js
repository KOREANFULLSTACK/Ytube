import express, { response } from "express";
import routes from "./routes";
import { home, search } from "../controllers/videoController";
import {
  join,
  postJoin,
  login,
  postLogin,
  logout,
  githubLogin,
  postGithubLogin,
  postNaverLogin
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

globalRouter.get(routes.github, githubLogin); //김님으로 계속이라는 페이지를 띄워줌.
globalRouter.get(
  /*
    김님으로 계속을 클릭하면 실행되는 녀석들. 
    0. 계속 버튼을 클릭한다.
    1. 깃헙페이지에서 설정한 callback url로 간다.
    2. callback url에서 passport.authenticate(github, {})을 실행한다.
      2-1. 인증함수 파라미터1 : 전략의 종류로 깃헙전략을 사용. 깃헙계정이 실제로 있는지 확인하고 있으면 사용자 정보를 토큰세션으로 받아 next.실패하면 /login으로 이동.
    3. 깃헙콜백 함수를 호출.
      3-1. 깃헙콜백의 profile인자에 github유저정보를 담아온다.
      3-2. 유저내용을 저장하고 깃헙로그인/조인이 처음이라면 새로운 유저를 만듬.
    
    */
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogin
);

globalRouter.get(routes.naver, passport.authenticate("naver"));

// creates an account if no account of the new user
globalRouter.get(
  routes.naverCallback,
  passport.authenticate("naver", { failureRedirect: "/login" }),
  postNaverLogin
);

export default globalRouter;
