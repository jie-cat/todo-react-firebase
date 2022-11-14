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

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className={style.container}>
        <h2 className={style.heading}>Sign up</h2>
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
            <button>Sign Up</button>
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
          <span className="text-gray-700">Already register the account?</span>
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </>
  );
};

export default Signup;
