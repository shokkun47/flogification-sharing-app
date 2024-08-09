import React, { forwardRef, useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import { ChatBubbleOutline, FavoriteBorder, Favorite, PublishOutlined, Repeat, VerifiedUser } from '@mui/icons-material';
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../firebase";
import "./Post.css";

const Post = forwardRef(
  ({ id, displayName, userId, verified, text, image, avatar, initialLikes, initialLikedUsers = [], place }, ref) => {
    const [likes, setLikes] = useState(initialLikes);
    const [hasLiked, setHasLiked] = useState(initialLikedUsers.includes(auth.currentUser?.uid));

    useEffect(() => {
      if (!id) {
        console.error("Error: Post ID is undefined");
        return;
      }

      const unsubscribe = onSnapshot(doc(db, "posts", id), (doc) => {
        const postData = doc.data();
        setLikes(postData?.likes || 0);
        setHasLiked(postData?.likedUsers?.includes(auth.currentUser?.uid));
      });

      return () => unsubscribe();
    }, [id]);

    const handleLike = async () => {
      if (auth.currentUser) {
        const postRef = doc(db, "posts", id);
        const newLikes = hasLiked ? likes - 1 : likes + 1;
        const newLikedUsers = hasLiked
          ? initialLikedUsers.filter(uid => uid !== auth.currentUser.uid)
          : [...initialLikedUsers, auth.currentUser.uid];

        await updateDoc(postRef, {
          likes: newLikes,
          likedUsers: newLikedUsers,
        });

        setHasLiked(!hasLiked);
        setLikes(newLikes);
      }
    };

    return (
      <div className="post" ref={ref}>
        <div className="post--avatar">
          <Avatar src={avatar} />
        </div>
        <div className="post--body">
          <div className="post--header">
            <div className="post--headerText">
              <h3>
                {displayName}
                <span className='post--headerSpecial'>
                  {verified && <VerifiedUser className='post--badge' />}
                  @{userId}
                </span>
              </h3>
            </div>
            <div className='post--headerDescription'>
              <p>{text}</p>
              <p>場所: {place}</p> {/* 場所の表示 */}
            </div>
          </div>
          {image && <img src={image} alt="" />}
          <div className="post--footer">
            <ChatBubbleOutline fontSize="small" />
            <Repeat fontSize='small' />
            <div onClick={handleLike} className="like-container">
              {hasLiked ? (
                <Favorite fontSize="small" style={{ color: "#4CAF50" }} />
              ) : (
                <FavoriteBorder fontSize="small" />
              )}
              <span style={{ marginLeft: "5px" }}>{likes}</span>
            </div>
            <PublishOutlined fontSize='small' />
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
