const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

// 미들웨어
app.use(cors());
app.use(bodyParser.json());

// Routes 가져오기
const postsRoute = require("./routes/posts");
app.use("/posts", postsRoute);

// 경로
app.get("/", (req, res) => {
  res.send("We are on home");
});

// 데이터베이스와 연결
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("데이터베이스와 연결되었습니다.");
});

app.listen(3000, () => {
  console.log("서버가 동작합니다.");
});
