/*
res.render( 템플릿 , 템플릿에 추가할 정보가 담긴 객체.)
모든 pug템플릿에는 확장자가 default이기 때문에 그대로 써주어도 된다.
*/

import routes from "../routers/routes";
//- db에서 가져온 videos 변수와 home.pug에서 쓸 videos 변수를 같게 하자. videos:videos // videos 이렇게 써도 둘다 동작함!
//  videos : videos 말고 videos 만 써도 가능!!
export const home = (req, res) => {
  res.render("home", { pageTitle: "Home", videos: videos });
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
