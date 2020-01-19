import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment" //outer JOIN Comment스키마와 합치고 comment 스키마에 있는 커멘트와 video스키마에 있는 video의 커멘트에 해당하는 id 컬럼들이 조인한다는 거 같은데.
    }
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video"
    }
  ]
});

/*

  User이라는 DB를 passport로컬몽구스와 plugin하는 과정
      플러그인으로 User스키마와 passportLocal몽구스를 끼워주자. 콘센트 끼우듯이
      그렇게 해주면 User스키마에 관한 번거로운 작업을 passmong이 알아서 해주니까.
  User스키마와 passportLocalMongoose플러그인과 동시에 username을 email로 설정.
  https://velog.io/@ground4ekd/nodejs-passport 참조
  
*/
UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;

/*      
    1. 스키마만들기
    2. 모델로써 등록하기
    3. 외부로 사용하기 위해 익스프토
    4. 미들웨어에게 사용권을 얻겠다고 알리기.
        
    
    등록과 사용은 엄연히 다르기 떄문에 사용하겠다는 걸 알려야한다.
*/
