import express from "express";
import routes from "./routes";
import {
  registerView,
  postDeleteComment,
  postEditComment,
  postComment
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.get(routes.regiterView(), registerView);
apiRouter.post(routes.addComment(), postComment);
apiRouter.post(routes.deleteComment(), postDeleteComment);
apiRouter.post(routes.editComment(), postEditComment);

export default apiRouter;
