/*
res.render( 템플릿 , 템플릿에 추가할 정보가 담긴 객체.)
모든 pug템플릿에는 확장자가 default이기 때문에 그대로 써주어도 된다.
*/

import routes from "../routers/routes";
import Video from "../models/Video";
import Comment from "../models/Comment"; //DB에서 Video가져오자
import User from "../models/User";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
      .sort({ _id: -1 })
      .populate("creator"); //Video.find({})은 Video에 있는 모든 데이터를 array가져와 리턴한다.
    //throw Error("lalala"); //이걸로 프로그램 동작을 멈출 수 있음. 하지만 우린 try catch를 썼으니 catch로 달아날꺼야. 그러곤 에러를 찍고 render을  해서 웹페이지가 동작이 되도록하겠지.
    res.render("home", { pageTitle: "Home", videos: videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const upload = (req, res) =>
  res.render("upload", { pageTitle: "upload" });

export const postUpload = async (req, res) => {
  const title = req.body.title;
  const description = req.body.descript;
  const path = req.file.path;
  const creator = req.user.id;

  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator
  });

  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  try {
    var i;
    let id = req.params.id;
    const video = await Video.findById(id).populate("creator");
    const videoComment = await Video.findById(id).populate("comments");

    const comment = {};
    for (i = 0; i < videoComment.comments.length; i++) {
      comment[i] = {
        id: String(videoComment.comments[i].creator),
        text: videoComment.comments[i].text,
        createAt: videoComment.comments[i].createdAt
      };
    }
    const length = i;

    for (i = 0; i < length; i++) {
      const tmp = await User.findById(comment[i].id);
      comment[i].name = tmp.name;
      comment[i].avatarUrl = tmp.avatarUrl;
    } //숫자가 작을수록 먼저 작성된 커멘트

    console.log(videoComment.comments[0].creator);
    console.log(typeof videoComment.comments[0].creator);
    console.log(videoComment.comments[1].creator);
    res.render("videoDetail", {
      pageTitle: video.title,
      video,
      videoComment: videoComment.comments,
      comments: comment
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postComment = async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await Comment.create({ text: req.body.comment });

    comment.creator.push(req.user.id);
    req.user.comments.push(comment._id);
    comment.save();
    req.user.save();

    const video = await Video.findById(id);
    video.comments.push(comment._id);
    video.save();

    console.log("comment : ", comment);
    console.log("Video:  ", video);
    console.log("user : ", req.user);
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }

  //유저에 커멘트 삽입
};

//video 수정할 때 그 video를 불러오지않으면 없는 video를 수정하게 되는 거니까 로딩락해주자.
export const editVideo = async (req, res) => {
  const id = req.params.id;

  //routes에서 이미 url다 작업해놨으니 editVideo에 들어오면 req.params로 파싱이 가능함.
  try {
    const video = await Video.findById(id);
    console.log("req.user정보!!!!!!!!", req.user);
    console.log("현재video의 정보!!!!", video);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video }); //{video}로 안주면 pug파일에서 인식을 못하더라.
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  try {
    //몽고DB는 기본적으로 _id를 가지고, pug가 똑똑해서 _id를 id로 넘겨줘도 인식이 가능했었던 것.
    await Video.findOneAndUpdate({ _id: id }, { title: title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const id = req.params.id;

  try {
    const video = await Video.findById({ _id: id });
    if (req.user.id === String(video.creator)) {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    return;
  }
  res.redirect(routes.home);
};

export const search = async (req, res) => {
  let searchingBy = req.query.input;

  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
    //JS내장의 정규표현식 regex는 단어가 포함되어있는 녀석들을 찾아주는 것이며, option : i는 덜 민감intensive하단 것으로 대소문자 구별X
  } catch (error) {}
  res.render("search", {
    searchingBy, //req.query.input middleware.js참조 검색창의 value
    videos,
    pageTitle: "Search Man"
  });
};

// res.render(".pug", { 색인 : 색인 })
