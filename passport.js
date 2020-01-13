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
import LocalStrategy from "passport-local";
import GitHubStrategy from "passport-github";
import NaverStrategy from "passport-naver";
import dotenv from "dotenv";
import routes from "./routers/routes";
import { githubCallback, naverCallback } from "./controllers/userController";
//User모델(DB)과 email을 통한 '인증방식'으로 연결.
dotenv.config();

/*
  passport.use(new LocalStrategy(User.authenticate()));
  나는 이 방법이 new도 있고 다른 passport configure와 비슷해서 이거 사용했었는데
  new LocalStrategy가 먹히는 건 namefiled option에 손 안댔을 때만, 우리는 email로 바꿨으므로
  User.createStrategy()를 써야한다.
*/
passport.use(User.createStrategy());
passport.use(
  //passport-github 전용전략을 '만들'었다. 사용하는 것과 만드는 건 엄연히 다르다 뭘 의미하고 어떤 동작이 일어나는지.
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

passport.use(
  new NaverStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `http://127.0.0.1:4000${routes.naverCallback}`,
      svcType: 0 // optional. see http://gamedev.naver.com/index.php/%EC%98%A8%EB%9D%BC%EC%9D%B8%EA%B2%8C%EC%9E%84:OAuth_2.0_API
    },
    naverCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*
    serialization : 통신할 때 object단위로 데이터를 보낼 수 없기 때문에 
    통신에 적합한 용기/포장을 해서 데이터를 송신함.
    반대로 수신측에서는 deserialization으로 언박싱해서 정보를 얻음.
*/

//쿠키에 id를 담고 그 id로 유저를 찾는다
