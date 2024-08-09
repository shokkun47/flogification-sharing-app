import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import './ChangeDisplayNamePopup.css';

function ChangeDisplayNamePopup({ open, onClose, onUpdate }) { // onUpdateを追加
  const [newDisplayName, setNewDisplayName] = useState('');

  const handleUpdateDisplayName = async () => {
    const user = auth.currentUser;
    if (user && newDisplayName.trim() !== '') {
      await updateProfile(user, { displayName: newDisplayName });
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { displayName: newDisplayName });
      
      // Firestoreのユーザードキュメントを再取得してonUpdateで親コンポーネントに渡す
      const updatedUserDoc = await getDoc(userRef);
      if (updatedUserDoc.exists()) {
        onUpdate(updatedUserDoc.data());
      }
      
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="change-displayname-dialog">
      <DialogTitle className="change-displayname-title">プロフィール名を変更</DialogTitle>
      <DialogContent className="change-displayname-content">
        <TextField
          autoFocus
          margin="dense"
          label="新しいプロフィール名"
          fullWidth
          value={newDisplayName}
          onChange={(e) => setNewDisplayName(e.target.value)}
          variant="outlined"
          className="change-displayname-textfield"
        />
      </DialogContent>
      <DialogActions className="change-displayname-actions">
        <Button onClick={onClose} className="change-displayname-button">キャンセル</Button>
        <Button onClick={handleUpdateDisplayName} disabled={!newDisplayName.trim()} className="change-displayname-button">更新</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChangeDisplayNamePopup;
