import express from "express";
import routes from "./routes";
import {
  videoDetail,
  upload,
  editVideo,
  deleteVideo,
  postUpload,
  postEditVideo
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload, upload);
videoRouter.post(routes.upload, uploadVideo, postUpload);
videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo(), editVideo);
videoRouter.post(routes.editVideo(), postEditVideo);
videoRouter.get(routes.deleteVideo(), deleteVideo);
//get(url, controller)이라는 형식이며, routes.editVideo()는 url에 id를 넘겨주는 String function임.
export default videoRouter;
