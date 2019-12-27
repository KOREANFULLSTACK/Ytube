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
    //throw Error("lalala"); //이걸로 프로그램 동작을 멈출 수 있음. 하지만 우린 try catch를 썼으니 catch로 달아날꺼야. 그러곤 에러를 찍고 render을  해서 웹페이지가 동작이 되도록하겠지.

    res.render("home", { pageTitle: "Home", videos: videos });
  } catch (error) {
    console.log("에러");
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const upload = (req, res) =>
  res.render("upload", { pageTitle: "upload" });

//한번 락을 걸어주자
export const postUpload = async (req, res) => {
  const body = {
    //upload의 pug파일의 name속성들과 일치해야함.
    title: req.body.title,
    description: req.body.descript
  };
  const file = {
    path: req.file.path
  };

  //create되기전에 다른액션으로 넘어가버리면 create가 안될 수도 있기 떄문에
  const newVideo = await Video.create({
    fileUrl: file.path,
    title: body.title,
    description: body.description
  });

  res.redirect(routes.videoDetail(newVideo.id));
};

//해당비디오가 DB에서 찾고 로딩될때까지 기다려줘
export const videoDetail = async (req, res) => {
  try {
    let id = req.params.id; //url의 id/name/user같은 부분들을 파싱해줌.
    const video = await Video.findById(id); //Video중에서 Id로 찾는 행위를 기다려줘

    res.render("videoDetail", { pageTitle: "detail", video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

//video 수정할 때 그 video를 불러오지않으면 없는 video를 수정하게 되는 거니까 로딩락해주자.
export const editVideo = async (req, res) => {
  const id = req.params.id;
  //routes에서 이미 url다 작업해놨으니 editVideo에 들어오면 req.params로 파싱이 가능함.
  console.log(id);
  try {
    const video = await Video.findById(id);
    console.log(video);
    res.render("editVideo", { pageTitle: "Edit", video }); //{video}로 안주면 pug파일에서 인식을 못하더라.
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  console.log(req.body);
  try {
    //몽고DB는 기본적으로 _id를 가지고, pug가 똑똑해서 _id를 id로 넘겨줘도 인식이 가능했었던 것.
    await Video.findOneAndUpdate({ _id: id }, { title: title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

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
