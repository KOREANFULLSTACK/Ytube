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
  //요청(req)한 수많으 정보들 console.log(req), 그 중에서 body란의 정보들을 가져옴.(단, bodyParser가 있을 경우)
  //user 요청 - - bodyParser middleware - - controleer - - join.pug 토해내기
  //즉, request한 body tag의 정보들을 가져옴. id pw name email 등등!

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  //웹에서 예외처리할땐 , status code를 참조하자
  //https://developer.mozilla.org/ko/docs/Web/HTTP/Status
  if (password !== password2) {
    res.status(400);
  } else {
    try {
      /* const user = await User.create({
        name,
        email
      }); */

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
  successRedirect: routes.home
});
/*
    `local`은 passport-local의 local로 전략의 하나.
    passport.authenticate() 메소드는 이전에 설정한 username 즉 email과 pass찾아보도록 설정되어있다.
    그렇다면 postJoin에서 받은 정보를 postLogin에서 계승 가능한 걸까? 이것이 미들웨어 특성인가?
  */

export const githubLogin = passport.authenticate("github");

//깃헙이동 후 김님으로 계속하시겠습니까? 의 화면에서 "예"를 누르면 동작되는 함수. 로그인 된 후 로그인 세션을 YTube 로 주고 callback url로 이동시킴.
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

      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const users = (req, res) => res.render("users", { pageTitle: "Users" });

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });

export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const changePassword = (req, res) =>
  res.render("change PW", { pageTitle: "Change Password" });

//깃헙으로 이동 후, 깃헙에서의 '김님으로 계속하시겠습니까' 라는 것을 실행시켜주는 passport의 메소드인듯.
