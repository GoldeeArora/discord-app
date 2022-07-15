import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { Navigate } from "react-router-dom";
import ServerIcon from "./ServerIcon";
import Channel from "./Channel";
import { collection, addDoc } from "firebase/firestore";
import { PlusIcon, ChevronDownIcon } from "@heroicons/react/outline";
// import { addDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { signOut } from "firebase/auth";
import { MicrophoneIcon, PhoneIcon, CogIcon } from "@heroicons/react/outline";
import Chat from "./Chat";
const Home = () => {
  const [user] = useAuthState(auth);
  const [channels] = useCollection(collection(db, "channels"));
  console.log(collection(db, "channels"));


  try {
    const handleAddChannel = async () => {
      const channelName = prompt("Enter a new channel name");
      if (channelName) {
        await addDoc(collection(db, "channels"), {
          channelName: channelName,
        });
      }
    };

    return (
      <>
        {!user && <Navigate to="/" />}
        <div className="flex h-screen">
          <div className="flex flex-col space-y-3 bg-discord_serversBg p-3 min-w-max">
            <div className="server-default hover:bg-discord_purple">
              <img src="https://rb.gy/kuaslg" alt="" className="h-5" />
            </div>
            <hr className="border-gray-700 border w-8 mx-auto" />
            <ServerIcon image="https://rb.gy/qidcpp" />
            <ServerIcon image="https://rb.gy/zxo0lz" />
            <ServerIcon image="https://rb.gy/qidcpp" />
            <ServerIcon image="https://rb.gy/zxo0lz" />
            <div className="server-default group">
              <PlusIcon className="text-discord_green h-7  group-hover:text-white" />
            </div>
          </div>
          <div className="bg-discord_channelsBg flex flex-col min-w-max">
            <h2 className="flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4  hover:bg-discord_serverNameHoverBg cursor-pointer">
              Official PAPA Server... <ChevronDownIcon className="h-5 ml-2" />
            </h2>
            <div
              className="text-discord_channel flex-grow overflow-y-scroll
          scrollbar-hide cursor-pointer"
              onClick={() => {
                <Link to="/channels" />;
              }}
            >
              <div className="flex items-center p-2 mb-2">
                <ChevronDownIcon className="h-3 mr-2" />
                <h4 className="font-semibold">Channels</h4>
                <PlusIcon
                  className="h-6 ml-auto cursor-pointer hover:text-white"
                  onClick={handleAddChannel}
                />
              </div>
              <div className="flex flex-col space-y-2 px-2 mb-4">
                {channels?.docs.map((doc) => (
                  <Channel
                    key={doc.id}
                    id={doc.id}
                    channelName={doc.data().channelName}
                  />
                ))}
              </div>
            </div>

            <div className="bg-[#292b2f] flex p-2 justify-between items-center space-x-8">
              <div className="flex items-center space-x-1">
                <img
                  src={user?.photoURL}
                  className="h-10 rounded-full cursor-pointer"
                  alt="can't print"
                  onClick={() => {
                    signOut(auth);
                  }}
                />
                <h4 className="text-white text-xs font-medium">
                  {user?.displayName}
                </h4>
                <span className="text-discord_userId block">
                  #{user?.uid.substring(0, 4)}
                </span>
              </div>
              <div className="text-gray-400 flex items-center ">
                <div className="hover:bg-discord_iconHoverBg p-2  rounded-md">
                  <MicrophoneIcon className="h-5 icon" />
                </div>
                <div className="hover:bg-discord_iconHoverBg p-2  rounded-md">
                  <PhoneIcon className="h-5 icon" />
                </div>
                <div className="hover:bg-discord_iconHoverBg p-2  rounded-md">
                  <CogIcon className="h-5 icon" />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#36393f] flex-grow">
            <Chat />
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.log(error.message);
  }
};

export default Home;
