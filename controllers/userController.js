/*
res.render( 템플릿 , 템플릿에 추가할 정보가 담긴 객체.)
모든 pug템플릿에는 확장자가 default이기 때문에 그대로 써주어도 된다.
*/
import routes from "../routers/routes";
import User from "../models/User";
import passport from "passport";

export const join = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  /*
    user의 get/post요청 - - bodyParser(middleware) - - router - - controller - - redirect("join") end point
        미들웨어의 순서는 app.js에 선언해놓은 순서대로! router제일 마지막이고 controller/pug는 end point!
    bodyParser가 있을 경우 req.body란의 정보들을 취할 수 있다
    body란의 자식속성은 pug파일의 tag이름과 대응된다. (name,email,password등은 pug의 태그 name과 같다)
  */

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  //https://developer.mozilla.org/ko/docs/Web/HTTP/Status
  if (password !== password2) {
    res.status(400);
  } else {
    try {
      const user = {
        name,
        email
      };

      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.join);
    }
  }
};
export const login = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

export const postLogin = passport.authenticate(`local`, {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  failureFlash: `Invalid username or password`,
  sucessFlash: `Welcome!`
});
/*
    `local`은 passport-local의 local로 전략의 하나.
    passport.authenticate() 메소드는 이전에 설정한 username 즉 email과 pass찾아보도록 설정되어있다.
    그렇다면 postJoin에서 받은 정보를 postLogin에서 계승 가능한 걸까? 이것이 미들웨어 특성인가?
  */

export const githubLogin = passport.authenticate("github");

//깃헙이동 후 김님으로 계속하시겠습니까? 의 화면에서 "예"를 누르면 동작되는 함수. 예 누르면 callback url로 이동하고 그곳에서 유저정보를 확인한 후 세션토큰으로 받는다.
export const githubCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const id = profile._json.id;
  const avatarUrl = profile._json.avatar_url;
  const name = profile._json.name;
  const email = profile._json.email;
  try {
    const user = await User.findOne({ email }); //email로 유저찾기
    //user가 존재하면 로그인.
    if (user) {
      user.githubId = id;
      user.avatarUrl = avatarUrl;
      user.save();

      console.log(user);
      return cb(null, user);
    } else {
      const newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl
      });
      console.log(`새로운 고객님 환영합니다`);
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const naverCallback = async (accessToken, refreshToken, profile, cb) => {
  //profile에 facebook에 관한 정보들이 주르륵 나오니 그 정보들을 토대로 YTube에 회원등록시키는 함수. return은 cb로!
  //facebookID와 YTube ID를 비교해서 유저가 존재한다면 로그인 그렇지않다면 가입시키기.
  console.log(accessToken, refreshToken, profile, cb);
  /* try {
    const user = await User.findOne({ facebookId: id });
    if (user) {
      //이미있는 고객
      console.log(profile);
      return cb(null, user);
    } else {
      //facebook 첫고객
      const newUser = await User.create({
        facebookId: id,
        name: facebookName
      });
      console.log(profile);
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  } */
};

export const postNaverLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const users = (req, res) => res.render("users", { pageTitle: "Users" });

export const userDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById({ _id: id });
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.send(error);
  }
};

export const editProfile = (req, res) => {
  const user = req.user;
  res.render("editProfile", { pageTitle: "Edit Profile", user });
};

export const postEditProfile = async (req, res) => {
  const id = req.user.id;
  const name = req.body.name;
  const email = req.body.email;
  console.log(("비밀번호  ", req.body.password));
  try {
    const user = await User.findOneAndUpdate({ _id: id }, { name, email });
    res.redirect(routes.userDetail(id));
  } catch (error) {
    res.send(error);
  }
};

export const changePassword = (req, res) => {
  const user = req.user;
  res.render("change PW", { pageTitle: "Change Password", user });
};

export const postChangePassword = async (req, res) => {
  const oldPassword = req.body.password1;
  const newPassword = req.body.password2;
  try {
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.home);
  } catch (error) {
    res.send("error");
  }
};

//깃헙으로 이동 후, 깃헙에서의 '김님으로 계속하시겠습니까' 라는 것을 실행시켜주는 passport의 메소드인듯.
