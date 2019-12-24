/*
  dotenv : DB 혹은 타인이 알면 곤란한 정보(KEY)를 숨김
  .dev 파일을 만들고 KEY값(URL/ PORT등)을 입력하고
  다른 파일에서 import해서 쓰는 방식.
  마지막으로 GitIgnore에 .dev를 무시하자.
  
  .env 파일의 정보를 가져오는 꿀팁 
  import dotenv from "dotenv"
  1. dotenv.config() // dotenv파일의 변수를 불러오는 메서드. process.env에 모든 정보가 담겨있다.
  2. process.env.MONGO_URL 혹은 PORT와 같이 .env파일에 저장해놓은 변수 바로 부를수잇음! config와 process.env는 set
 */

import mongoose from "mongoose"; //DB(C++/NoSql기반) - - - - Bridge - - - - NodeJS(JS기반) 이어주는 녀석이 mongoose.
import dotenv from "dotenv";
dotenv.config();

/* mongoose.connect("mongodb://localhost:27017/Ytube",{   //mongoose.connect("url", 그 밖의 셋팅);
  useNewUrlParser: true,
  useFindAndModify: false
}); */

//NodeJS와 MongDb연결
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;

const handleOpen = () =>
  console.log(`Connected to DB ${process.env.PORT} ${process.env.MONGO_URL}`);
const handleError = () => console.log("XXXX");

db.once("open", handleOpen);
db.on("error", handleError);
