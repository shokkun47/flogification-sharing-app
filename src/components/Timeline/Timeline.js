import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from '../../firebase';
import FlipMove from 'react-flip-move';
import './Timeline.css';
import TweetBox from './TweetBox';
import Post from './Post';

function Timeline({ searchTerm }) {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const postData = collection(db, "posts");
    const q = query(postData, orderBy("timestamp", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setPosts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const postData = collection(db, "posts");
      const q = query(postData, where("text", "==", searchTerm));
      onSnapshot(q, (querySnapshot) => {
        setSearchResults(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div className="timeline">
      <div className="timeline--header">
        <h2>ホーム</h2>
      </div>
      <TweetBox />
      <FlipMove>
        {(searchResults.length > 0 ? searchResults : posts).map((post) => (
          <Post
            key={post.id}
            id={post.id}
            displayName={post.displayName}
            userId={post.userId}
            verified={post.verified}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
            initialLikes={post.likes}
            place={post.place} // 場所を渡す
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Timeline;
