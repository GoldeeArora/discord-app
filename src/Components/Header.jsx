import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MenuIcon } from "@heroicons/react/solid";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
const Header = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const signIn = (e) => {
    e.preventDefault();

    signInWithPopup(auth, googleProvider)
      .then(() => navigate("/channels"))
      .catch((error) => alert(error.message));
  };
  return (
    <header className="flex items-center justify-between py-4 px-6 bg-discord_blue">
      <Link to="/">
        <img
          src="https://i.ibb.co/Y8vBXm9/Discord-Logo-Wordmark-White.png"
          alt=""
          className="w-32 h-12 object-contain rounded-sm"
        />
      </Link>
      <div className="hidden lg:flex space-x-6">
        <a className="link text-white">Download</a>
        <a className="link text-white">Why Discord?</a>
        <a className="link text-white">Nitro</a>
        <a className="link text-white">Safety</a>
        <a className="link text-white">Support</a>
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-white p-2 rounded-full text-xs md:text-sm px-4 focus:outline-none hover:shadow-2x1 hover:text-discord_blurple transition duration-200 ease-in-out whitespace-nowrap font-medium"
          style={{ fontFamily: "Montserrat", fontWeight: "bold" }}
          onClick={!user ? signIn : () => navigate("/channels")}
        >
          {!user ? "Login" : "Open Discord"}
        </button>
        <MenuIcon className="text-white font-extrabold h-9 cursor-pointer lg:hidden" />
      </div>
    </header>
  );
};

export default Header;
