import routes from "./routers/routes"; //default export라서 파일전체 접근가능. 접근할 땐 routes.~~이렇게
import multer from "multer";
//res.locals에 대한 api문서 : https://expressjs.com/ko/api.html#res.locals에 나와있듯이, views폴더내 프로젝트파일들만 접근가능.

const multerVideo = multer({ dest: "uploads/videos/" });
const multerImage = multer({ dest: "uploads/images/" });

export const localsMiddleware = (req, res, next) => {
  /*
  쓰고싶은 local변수 이제 global로 쓰자!! views디렉토리 내 파일이라면 어디에서나 접근 가능하다구
  
    쓰고 싶은 변수있으면 임포트해서 res.locals.potato = import한 변수명;
    `res.locals.~~` 이 부분이 locals에 등록/저장하는 부분이며, ~~ 부분은 pug파일에서 접근가능한 변수명
    그리고, = 의 뒷부분이 실제 변수가 들어가는 부분. int a = 5; 과 같이 a 부분이 siteName/ routes/ user가 된다.
  
  locals에 siteName, routes를 등록해두고 얘네들을 호출하면 등록부에서 찾아서 쓰는 방식인 것 같아.

  
  */
  res.locals.siteName = "YTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  //req.user는 어디서 왔나? 얘는 app.js의 app.use(passort.initialize()를 써두면 정보들이 req.user로 들어가게 설정되있음.)
  next();
  //안해주면 다음 middleware로 죽, app.use(global blabla..)로 못넘어가서 무한로딩뜸.
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single(`videoFile`);
//single은 오직 하나의 파일만 올릴수 있음. 'videoFile은 upload의 file의 name변수 video url을 의미.

export const uploadImage = multerImage.single(`imageFile`);
