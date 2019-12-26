/*
res.render( 템플릿 , 템플릿에 추가할 정보가 담긴 객체.)
모든 pug템플릿에는 확장자가 default이기 때문에 그대로 써주어도 된다.
*/

import routes from "../routers/routes";
import Video from "../models/Video"; //DB에서 Video가져오자

//- db에서 가져온 videos 변수와 home.pug에서 쓸 videos 변수를 같게 하자. videos:videos // videos 이렇게 써도 둘다 동작함!
//  videos : videos 말고 videos 만 써도 가능!!

export const home = async (req, res) => {
  /*
  async. 자바스크립트는 비동기언어로 한번에 여러가지 일을 처리할 수 있다.
  이말은 즉, C언의 input이 들어올때까지 기다리지 않는다는 것이다.
  유저의 입력/요청이 올때까지 그 일을 기다리지않고 다른 것으로 넘어가버린다는 것으로
  너가 만약 "다른거하지말고 기다려줘!" 라고 하고싶으면, async명령어를 쓰면된다.

  await Video.find({})는 Video녀석이 find를 할 때까지 async로써 기다릴액션을 구체적으로 지정하는 것.
  wait이 끝날때까지(성공적으로 끝날지 에러가 있어 끝나버리는지는 중요X)는 뒤의 코드 render부분을 실행하지 않을 것!
  그래서 에러가 생겨서 끝나버리는 경우를 대비해 try문으로 묶는다.
  */
  try {
    //try 실행해보고 에러가 있으면 catch로 빤스런.
    const videos = await Video.find({}); //Video.find({})은 Video에 있는 모든 데이터를 array가져와 리턴한다.
    //throw Error("lalala"); //이걸로 프로그램 동작을 멈출 수 있음. 하지만 우린 try catch를 썼으니 catch로 달아날꺼야. 그러곤 에러를 찍고 render을 해서 웹페이지가 동작이 되도록하겠지.
    console.log(videos);
    res.render("home", { pageTitle: "Home", videos: videos });
  } catch (error) {
    console.log("에러");
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const upload = (req, res) =>
  res.render("upload", { pageTitle: "upload" });

export const postUpload = (req, res) => {
  const body = {
    file: req.body.file,
    title: req.body.title,
    description: req.body.description
  };
  //To do upload and save video
  console.log(body);
  res.redirect(routes.videoDetail(324393));
};

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "videoDetail" });

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "editVideo" });

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "deleteVideo" });

export const search = (req, res) => {
  console.log(req.query);

  res.render("search", {
    searchingBy: req.query.input, //req.query.input middleware.js참조 검색창의 value
    videos, //db.js참조
    pageTitle: "Search Man"
  });
};

// res.render(".pug", { 색인 : 색인 })
