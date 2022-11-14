import React from "react";
import { Link, useNavigate } from "react-router-dom";
// auth
import { UserAuth } from "../contexts/AuthContext";

const style = {
  bg: `w-screen h-[70px] bg-slate-100 text-black fixed font-bold text-lg p-3`,
  navbar: `flex justify-end align-center`,
  navItem: `p-3 cursor-pointer rounded-xl hover:text-white hover:bg-black  hover:text-xl hover:mx-2 duration-300`,
};

const Navbar = () => {
  const { user, logOut } = UserAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className={style.bg}>
        <nav>
          {user?.email ? (
            <ul className={style.navbar}>
              <li className={style.navItem}>
                <Link to="/">Home</Link>
              </li>
              <li onClick={handleLogout} className={style.navItem}>
                <a>Sign out</a>
              </li>
              <li className={style.navItem}>
                <Link to="/signup">Sign up</Link>
              </li>
            </ul>
          ) : (
            <ul className={style.navbar}>
              <li className={style.navItem}>
                <Link to="/">Home</Link>
              </li>
              <li className={style.navItem}>
                <Link to="/login">Sign in</Link>
              </li>
              <li className={style.navItem}>
                <Link to="/signup">Sign up</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
