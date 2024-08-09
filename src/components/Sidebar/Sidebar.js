// src/components/Sidebar/Sidebar.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarOption from './SidebarOption';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './Sidebar.css';
import ChangeDisplayNamePopup from '../ChangeDisplayNamePopup/ChangeDisplayNamePopup'; 
import Ranking from '../Ranking/Ranking'; // ランキングコンポーネントをインポート

function Sidebar() {
  const location = useLocation();
  const [popupOpen, setPopupOpen] = useState(false);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUser(userDoc.data());
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('Signed out successfully');
    }).catch((error) => {
      console.error('Sign out error', error);
    });
  };

  const handleProfileClick = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <div className="sidebar">
      <img src='/images/logo-flog.png' alt="Flog Icon" className='sidebar--flogIcon' />
      <SidebarOption text="ホーム" Icon={HomeIcon} active={location.pathname === '/'} />
      <SidebarOption text="話題の検索" Icon={SearchIcon} />
      <SidebarOption text="通知" Icon={NotificationsNoneIcon} />
      <SidebarOption text="メッセージ" Icon={MailOutlineIcon} />
      <SidebarOption text="ブックマーク" Icon={BookmarkBorderIcon} />
      <SidebarOption text="リスト" Icon={ListAltIcon} />
      <SidebarOption text="プロフィール" Icon={PermIdentityIcon} onClick={handleProfileClick} />
      <SidebarOption text="もっとみる" Icon={MoreHorizIcon} />
      <Button variant="outlined" className="sidebar--tweet" fullWidth>
        ツイートする
      </Button>
      <Button onClick={handleSignOut} variant="outlined" className="sidebar--logout" fullWidth>
        ログアウト
      </Button>
      <ChangeDisplayNamePopup open={popupOpen} onClose={handleClosePopup} onUpdate={handleUpdateUser} />
    </div>
  );
}

export default Sidebar;
