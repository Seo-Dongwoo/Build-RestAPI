# Rest api 만들기

### node.js express 및 mongodb를 사용

---

### Rest api는 프런트 엔드에서 백엔드 코드를 분리하여 
### 여러 애플리케이션 (모바일 앱, 웹 앱 등)에서 사용할 수 있도록 도와줍니다.

---

### 모든 메소드 (GET, POST, DELETE, PATCH)를 사용하여 
### 간단한 블로그 게시물 유형 API를 구축하는 연습을 진행하였다.

--- 

### app.js
```
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
```

### routes/posts.js
```
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// 모든 Post 가져오기
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {}
});

// 특정 Post 가져오기
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

// Post 생성
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savePost = await post.save();
    res.json(savePost);
  } catch (err) {
    res.json({ message: err });
  }
});

// Post 업데이트
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// Post 삭제
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
```

### models/Post.js
```
const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Posts", PostSchema);
```

---

### MondoDB 저장된 데이터
![데이터베이스](https://user-images.githubusercontent.com/83106932/162733418-d731566b-2aeb-4cdc-9e71-90fbaa0360d4.png)

---

### codepen으로 데이터 불러오기
![codepen데이터불러기](https://user-images.githubusercontent.com/83106932/162733804-6fe36ed4-5c78-46fb-b3d2-f4de9232ebe3.png)


