import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// auth
import { UserAuth } from "../contexts/AuthContext";

const style = {
  container: `bg-slate-100 max-w-[600px] m-auto rounded-lg p-5 mt-24`,
  heading: `text-4xl py-2 font-bold`,
  input: `w-full px-2 py-5 outline-none text-xl hover:bg-slate-200 my-2`,
  submitBtn: `w-[full] bg-pink-500 p-2 text-slate-100 text-center text-2xl`,
  content: `flex justify-between items-center text-gray-700 my-5`,
  checkBox: `mr-1 cursor-pointer`,
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message); //登入失敗在下面顯示錯誤訊息
    }
  };

  return (
    <>
      <div className={style.container}>
        <h2 className={style.heading}>Sign in</h2>
        {error ? <p className="text-red-600">{error}</p> : null}
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className={style.input}
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className={style.input}
            type="passowrd"
            placeholder="Password"
          />
          <div className={style.submitBtn}>
            <button>Sign In</button>
          </div>
        </form>

        <div className={style.content}>
          <p>
            <input className={style.checkBox} type="checkbox" />
            Remember me
          </p>
          <p className="cursor-pointer">Need help?</p>
        </div>
        <p className="text-red-600 my-5">
          <span className="text-gray-700">New User?</span>
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
