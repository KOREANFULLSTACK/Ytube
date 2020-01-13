import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config(); //dotenv파일의 변수들을 전부 불러와주는 메서드. precess.env에 모두 넣기로 한다.

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`listening import on : http://localhost:${PORT}`);

app.listen(PORT, "127.0.0.1", handleListening);

/* 
  프로그램 순서상, db가 먼저 import되므로 connecting db문구가 먼저 찍혀야 되지 않을까?
  하지만 그렇지 않은 이유는 DB서버와 연결하는 건 시간이 꽤 오래걸리기 때문에 asnc 특성으로
  한번에 많은 일을 처리하기 때문에 listen먼저 찍고 그 후에 db가 찍힌다.
*/
