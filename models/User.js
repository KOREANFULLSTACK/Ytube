import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number
});

/*

  User이라는 DB를 passport로컬몽구스와 plugin하는 과정
      플러그인으로 User스키마와 passportLocal몽구스를 끼워주자. 콘센트 끼우듯이
  https://github.com/saintedlama/passport-local-mongoose 참조
  
*/
UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;

/*      
    1. 스키마만들기
    2. 모델로써 등록하기
    3. 외부로 사용하기 위해 익스프토
    4. app.use로 DB에게 사용권을 얻겠다고 알리기.
        
    
    등록과 사용은 엄연히 다르기 떄문에 사용하겠다는 걸 알려야한다.
*/
