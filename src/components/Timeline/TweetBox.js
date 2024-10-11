import { Avatar, Button, MenuItem, Select } from '@mui/material';
import React, { useState } from "react";
import "./TweetBox.css";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const [place, setPlace] = useState("");
  const user = auth.currentUser;

  const sendTweet = async (e) => {
    e.preventDefault();

    if (user) {
      await addDoc(collection(db, "posts"), {
        displayName: user.displayName,
        userId: user.uid,
        verified: true,
        text: tweetMessage,
        avatar: user.photoURL,
        image: tweetImage,
        timestamp: serverTimestamp(),
        likes: 0,
        likedUsers: [],
        place: place // 場所の情報を追加
      });

      setTweetMessage("");
      setTweetImage("");
      setPlace(""); // プルダウンを初期化
    }
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox--input">
          <Avatar src={user?.photoURL} />
          <input
            value={tweetMessage}
            onChange={(e) => setTweetMessage(e.target.value)}
            placeholder="どうして蛙化したの？"
            type="text"
          />
        </div>
        <Select
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className="tweetBox--placeInput"
          displayEmpty
        >
          <MenuItem value=""><em>蛙化した場所は？</em></MenuItem>
          <MenuItem value="家">家</MenuItem>
          <MenuItem value="お店">お店</MenuItem>
          <MenuItem value="車">車</MenuItem>
          <MenuItem value="学校">学校</MenuItem>
          <MenuItem value="職場">職場</MenuItem>
          <MenuItem value="道">道</MenuItem>
          <MenuItem value="フードコート">フードコート</MenuItem>
          <MenuItem value="その他">その他</MenuItem>
        </Select>
        <input
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
          className="tweetBox--imageInput"
          placeholder="画像のURLを入力してください"
          type="text"
        />
        <Button
          className="tweetBox--tweetButton"
          type="submit"
          onClick={sendTweet}
          disabled={!tweetMessage.trim() || !place}
        >
          ツイートする
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
