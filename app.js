import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
//node js 의 npm package import

import routes from "./routers/routes";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";
// my project import

const app = express(); //import한 express를 인스턴트로 만듬

app.use(helmet()); //미들웨어를 조금 더 안전하게 헬멧을 씌움
app.set(`view engine`, "pug");
/*
    express의 application 설정을 바꿔주는 메소드.
    app.set("property"," "); 지금의경우는 디폴트인 view engine을 pug로 세팅한다
    property는 express api참조 사이트의 app.set란에 많음
    pug는 express의 view engine의 템플릿언어. 우리는 view engine으로 pug를 사용하겟다.
    pug는 확장자가 .pug이며 views폴더에서 html대신 pug로 작업한다.
    그리고 views engine이 pug파일을 찾으러다닐꺼다

/*
    img,video의 처리과정 
        비디오업로드(fileUrl / id) > 디렉토리에 해당파일 저장 > 미들웨어가 디렉토리탐색후 유저에게 제공
        지금이 마지막과정이며, 디렉토리 내의 경로에 대해서는 최상위디렉토리인 /uploads로 마운팅한 후
        uploads에 해당되어있는 모든 디렉토리를 허용해서 제공해준다.
*/
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

/* app.use((req,res,next)=>{
        바로 인자에 function 만들기. 편한방법대로 해.
})*/

//router의 변수를 header.pug로 가져와서 사용할 녀석. 먼저, middlewares.js만들고 middlewares.js를 임포트하자
//이제부터 local변수를 global변수처럼 쓸꺼야! 궁금하다면 localsMiddlesware참조해
app.use(localsMiddleware);

/*
    localsMiidleware에서 next()해주지않으면 무한로딩되는데, 왜 route에서 next가 없는데 다음으로 잘 넘어가는 걸까? 
    그건 라우팅에서 render로 response하고 다른 terminal로 연결시키기 때문임! next가 연결수단이지만 다른 방법도있음!
*/

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); ///userRouter녀석들 마운팅 어디에? /user에
app.use(routes.videos, videoRouter);

export default app;
