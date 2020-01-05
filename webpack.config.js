const path = require("path");
const ExcreactCSS = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ENTRY_FILE,
  mode: MODE,
  module: {
    //module을 발견할 때 다음의 rules을 따라라! 라는 의미 test가 나오면 use의 순서로 실행
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: `babel-loader`
          }
        ]
      },
      {
        //webpack은 scss가 무슨파일인지 모르니까 loader로써 rule을 줌. 정규식으로 확장자를 추출
        //SCSS확장자파일찾고 CSS로 바꾸고 해당CSS텍스트추출 CSS하나의 파일만들기
        test: /\.(scss)$/,
        use: ExcreactCSS.extract([
          //extract는 scss파일을 css로 통역한다
          //코드가 아래>위 순서대로 동작하기 때문에 순서도 반대로 써줘야 한다.
          {
            // 3.순수한 css가 불러와지면 webpack이 그걸 해석하는 것.
            loader: `css-loader`
          },
          {
            // 2.css 브라우저간 호환성을 없앤다. 구글/파이어폭스/엣지 모두 가능하게 하는 것.
            loader: `postcss-loader`,
            options: {
              plugin() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              }
            }
          },
          {
            // 1.scss > css, SCSS은 SASS기능을 지원한다 CSS와 같은 문법으로.
            loader: `sass-loader`
          }
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  plugins: [new ExcreactCSS("styles.css")]
};

module.exports = config;
