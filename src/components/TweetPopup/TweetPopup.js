import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import './TweetPopup.css';

function TweetPopup({ open, onClose }) {
  const [tweetMessage, setTweetMessage] = useState('');
  const [tweetImage, setTweetImage] = useState('');

  const handleTweet = async () => {
    const user = auth.currentUser;
    if (user) {
      await addDoc(collection(db, 'posts'), {
        displayName: user.displayName,
        username: user.uid,
        verified: true,
        text: tweetMessage,
        avatar: user.photoURL,
        image: tweetImage,
        timestamp: serverTimestamp(),
        likes: 0,
        likedUsers: []
      });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="tweet-dialog">
      <DialogTitle className="tweet-dialog-title">新しいツイート</DialogTitle>
      <DialogContent className="tweet-dialog-content">
        <TextField
          autoFocus
          margin="dense"
          label="ツイートメッセージ"
          fullWidth
          value={tweetMessage}
          onChange={(e) => setTweetMessage(e.target.value)}
          variant="outlined"
          className="tweet-text-field"
        />
        <TextField
          margin="dense"
          label="画像URL"
          fullWidth
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
          variant="outlined"
          className="tweet-text-field"
        />
      </DialogContent>
      <DialogActions className="tweet-dialog-actions">
        <Button onClick={onClose} className="tweet-button">キャンセル</Button>
        <Button onClick={handleTweet} disabled={!tweetMessage} className="tweet-button">ツイート</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TweetPopup;
