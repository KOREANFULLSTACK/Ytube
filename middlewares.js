import routes from "./routers/routes"; //default export라서 파일전체 접근가능. 접근할 땐 routes.~~이렇게
import multer from "multer";
//res.locals에 대한 api문서 : https://expressjs.com/ko/api.html#res.locals에 나와있듯이, views폴더내 프로젝트파일들만 접근가능.

const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
  /*
  쓰고 싶은 변수있으면 임포트해서 res.locals.potato = import한 변수명;
  쓰고싶은 local변수 이제 global로 쓰자!! views디렉토리 내 파일이라면 어디에서나 접근 가능하다구
  locals에 siteName, routes를 등록해두고 얘네들을 호출하면 등록부에서 찾아서 쓰는 방식인 것 같아.
  */
  res.locals.siteName = "YTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };
  next(); //안해주면 다음 middleware로 죽, app.use(global blabla..)로 못넘어가서 무한로딩뜸.
};

export const uploadVideo = multerVideo.single(`videoFile`);
//single은 오직 하나의 파일만 올릴수 있음. 'videoFile은 upload의 file의 name변수 video url을 의미.
