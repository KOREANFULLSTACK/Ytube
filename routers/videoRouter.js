import express from "express";
import routes from "./routes";
import {
  videoDetail,
  upload,
  editVideo,
  deleteVideo,
  postUpload,
  postEditVideo,
  postComment
} from "../controllers/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload, onlyPrivate, upload);
videoRouter.post(routes.upload, uploadVideo, onlyPrivate, postUpload);
videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.post(routes.videoDetail(), postComment);
videoRouter.get(routes.editVideo(), onlyPrivate, editVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);
//get(url, controller)이라는 형식이며, routes.editVideo()는 url에 id를 넘겨주는 String function임.
export default videoRouter;
