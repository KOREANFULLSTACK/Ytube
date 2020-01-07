/*  passport local mongoose 사용법
        유저모델 생성 -> passport 선언 -> passport-local 기본설정 -> 사용


        0. passport-local-mongoose와 User의 해당 스키마 플러그인(컨센트끼우기) User.js
        1. passport-local-mongoose와 User스키마 설정한 걸 create하기.
        2. LocalStrategy와 serializeUser/ deserializeUser 구현
        3. passport선언  
            *app.use(passport. ~~ ) 
            *import "passport" from "passport";
            *import "./passport";

*/

import passport from "passport";
import User from "./models/User";
import GitHubStrategy from "passport-github";
import dotenv from "dotenv";
import routes from "./routers/routes";
import { githubCallback } from "./controllers/userController";
//User모델(DB)과 email을 통한 '인증방식'으로 연결.
dotenv.config();

passport.use(User.createStrategy()); //전략생성
passport.use(
  new GitHubStrategy(
    {
      //https://github.com/settings/applications/new등록한 후 얻는 ID/Secret. .env로 은닉시키자
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`
    },

    //인증을 받고 사용자가 깃헙으로부터 우리YTube로 돌아왔을 떄 github의 정보를 받는 함수
    githubCallback
  )
);

/*
    serialization : 통신할 때 object단위로 데이터를 보낼 수 없기 때문에 
    통신에 적합한 용기/포장을 해서 데이터를 송신함.
    반대로 수신측에서는 deserialization으로 언박싱해서 정보를 얻음.
*/
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//쿠키에 id를 담고 그 id로 유저를 찾는다
