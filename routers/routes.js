//URL주소관리

//Global

const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//Users

const USERS = "/users";
const EDIT_PROFILE = "/:id/edit";
const CHANGE_PASSWORD = "/:id/change-password";
const USER_DETAIL = "/:id"; // /users/1 : 1번 유저를 줌.

//github

const GITHUB = "/auth/github";
const GITHUBCALLBACK = "/auth/github/callback";
const NAVER = "/auth/naver";
const NAVERCALLBACK = "/auth/naver/callback";

//Videos

const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id"; //"id"는 텍스트 :id 는 변수
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

//API
const API = "/api";
const ADD_COMMENT = "/:id/add";
const EDIT_COMMENT = "/:id/edit";
const DELETE_COMMENT = "/:id/delete";
const REGISTER_VIEW = "/:id/view";

/*  
  조회수 방식의 원리 
    누군가가 video를 보면 조회수가 올라가기 마련이다 
    여기서는 비디오를 클릭해서 api/1ddw18921wdq1d/view로 가게되면 조회수가 상승
*/

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: id => {
    if (id) return `${USERS}/${id}`;
    //id가 있는 경우와 없는 경우가 있다.
    else return USER_DETAIL; //그래서 userRouter에 routes.userDetail() 매개인자를 안줘도 default로 스마트하게 작동하는 듯
  },
  editProfile: id => {
    if (id) return `${USERS}/${id}/edit`;
    else return EDIT_PROFILE;
  },
  changePassword: id => {
    if (id) return `${USERS}/${id}/change-password`;
    else return CHANGE_PASSWORD;
  },

  github: GITHUB,
  githubCallback: GITHUBCALLBACK,
  naver: NAVER,
  naverCallback: NAVERCALLBACK,

  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: id => {
    if (id) return `${VIDEOS}/${id}`;
    else return VIDEO_DETAIL;
  },
  editVideo: id => {
    if (id) return `${VIDEOS}/${id}/edit`;
    else return EDIT_VIDEO;
  },

  deleteVideo: id => {
    if (id) return `${VIDEOS}/${id}/delete`;
    else return DELETE_VIDEO;
  },

  //api
  api: API,
  addComment: id => {
    if (id) return `${API}/${id}/add`;
    return ADD_COMMENT;
  },
  editComment: id => {
    if (id) return `${API}/${id}/edit`;
    else return EDIT_COMMENT;
  },
  deleteComment: id => {
    if (id) return `${API}/${id}/delete`;
    else return DELETE_COMMENT;
  },
  regiterView: id => {
    if (id) return `${API}/${id}/view`;
    else return REGISTER_VIEW;
  }
};

export default routes;
