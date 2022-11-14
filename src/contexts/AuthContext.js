import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth, db } from "../firebase"; //取得認證資料

import { doc, setDoc, addDoc, collection } from "firebase/firestore";

// 建立 Context物件
const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({}); //儲存註冊用戶 登入/登出 的狀態

  // 註冊
  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);

    addDoc(collection(db, email), {
      text: "Learn React",
      completed: false,
    });
  };

  // 登入
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 登出
  const logOut = () => {
    return signOut(auth);
  };

  // 即時觀察登入狀態
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      //  currentUser為儲存登入登出狀態資料,如果登出狀態資料就會是空的, 登入就把狀態資料傳進state
      setUser(currentUser);
      console.log(currentUser); //登出狀態會是 null
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
