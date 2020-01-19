import mongoose from "mongoose";

/*
    Video.js를 DB에 저장하지 않을꺼임. url로 보낼꺼야 아마존의 서버어딘가에 저장되겟지.
    mongoose.Schema는 테이블(스키마)의 형식과 데이터타입등에 있어 오류가 있는 지 검사해줌.
    id값은 mongoDB가 자동적으로 처리해줌.
*/
const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: `File URL is required`
  },
  title: {
    type: String,
    required: "Title is required"
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment" //outer JOIN Comment스키마와 합치고 comment 스키마에 있는 커멘트와 video스키마에 있는 video의 커멘트에 해당하는 id 컬럼들이 조인한다는 거 같은데.
    }
  ],

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

/*
    mongoose.model호출 시 DB서버측에 VideoSchema를 등록할게요! 라고 VideoSchema에 대한 정보또한 담고있다.
    등록한 스키마를 사용하기 위해서는 server측에서 import해주지 않으면 인식을 못 한다. db.js 혹은 init.js
*/
const model = mongoose.model("Video", VideoSchema);
export default model;
