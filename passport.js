/*  passport local mongoose 사용법
        
        0. passport-local-mongoose와 DB의 해당 스키마 플러그인(컨센트끼우기) User.js
        
        1. passport/ Passport-local을 구성해야한다.
        2. LocalStrategy(인증하는 방법)와 serializeUser/ deserializeUser 구현

*/

import passport from "passport";
import User from "./models/User";

//User모델(DB)과 email을 통한 '인증방식'으로 연결.
passport.use(User.createStrategy());

/*
    serialization : 통신할 때 object단위로 데이터를 보낼 수 없기 때문에 
    통신에 적합한 용기/포장을 해서 데이터를 송신함.
    반대로 수신측에서는 deserialization으로 언박싱해서 정보를 얻음.
*/
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//쿠키에 id를 담고 그 id로 유저를 찾는다
