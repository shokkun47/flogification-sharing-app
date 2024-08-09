import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider, db } from '../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import styles from './LoginForm.module.css';

function LoginForm() {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user document exists
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      // If user document doesn't exist, create one
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date()
        });
      }
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginPage__imageContainer}>
        <img src={`${process.env.PUBLIC_URL}/images/logo-flog.png`} alt="Frog" className={styles.loginPage__image} />
      </div>
      <div className={styles.loginForm}>
        <div className={styles.loginForm__container}>
          <h1 className={styles.loginForm__title}>Welcome to <span>蛙化共有アプリ</span></h1>
          <p className={styles.loginForm__subtitle}>Sign in to continue</p>
          <SignInButton onClick={signInWithGoogle} />
        </div>
      </div>
    </div>
  );
}

function SignInButton({ onClick }) {
  return (
    <button className={styles.loginForm__button} onClick={onClick}>
      Sign in with Google
    </button>
  );
}

export default LoginForm;
