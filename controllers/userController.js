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
      const user = await User.create({
        name,
        email
      });
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

export const logout = (req, res) => {
  //To do: rocess logout
  res.redirect(routes.home);
};

export const users = (req, res) => res.render("users", { pageTitle: "Users" });

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });

export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const changePassword = (req, res) =>
  res.render("change PW", { pageTitle: "Change Password" });
