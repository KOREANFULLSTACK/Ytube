import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config(); //dotenv파일의 변수들을 전부 불러와주는 메서드. precess.env에 모두 넣기로 한다.

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`listening import on : http://localhost:${PORT}`);

app.listen(PORT, handleListening);
