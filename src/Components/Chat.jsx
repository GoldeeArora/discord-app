import {
  BellIcon,
  HashtagIcon,
  ChatIcon,
  UsersIcon,
  SearchIcon,
  QuestionMarkCircleIcon,
  InboxIcon,
  PlusCircleIcon,
  EmojiHappyIcon,
  GiftIcon,
} from "@heroicons/react/solid";
import Message from "./Message";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRef } from "react";
import { auth, db } from "../firebase";
import { useSelector } from "react-redux/es/exports";
import { selectChannelId, selectChannelName } from "../features/channelSlice";
import { addDoc, collection, doc, orderBy, query } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
function Chat() {
  const channelId = useSelector(selectChannelId);
  const inputRef = useRef("");
  const channelName = useSelector(selectChannelName);
  const [user] = useAuthState(auth);
  const chatRef = useRef("");
  const [messages] = useCollection(
    channelId &&
      query(
        collection(doc(collection(db, "channels"), channelId), "messages"),
        orderBy("timestamp", "asc")
      )
  );
  console.log(messages);
  try {
    const scrollToBottom = () => {
      chatRef.current.scrollIntoView({
        behaviour: "smooth",
        block: "start",
      });
    };
    const sendMessage = (e) => {
      e.preventDefault();
      if (inputRef.current.value !== "") {
        console.log(channelName, channelId);
        addDoc(
          collection(doc(collection(db, "channels"), channelId), "messages"),
          {
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: inputRef.current.value,
            name: user?.displayName,
            photoURL: user?.photoURL,
            email: user?.email,
          }
        );
      }

      inputRef.current.value = "";
      scrollToBottom();
    };
    return (
      <div className="flex h-screen flex-col">
        <header className=" items-center justify-between space-x-5  border-b border-gray-800 p-4 -mt-1 hidden md:flex">
          <div className="flex items-center space-x-1">
            <HashtagIcon className="h-6 text-[#72767d] " />
            <h4 className="text-white font-semibold">{channelName}</h4>
          </div>
          <div className="flex space-x-3">
            <BellIcon className="icon mt-1" />
            <ChatIcon className="icon mt-1" />
            <UsersIcon className="icon mt-1" />
            <div className="flex bg-[#202225] text-xs p-1 rounded-md">
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent focus:outline-none text-white p-1 placeholder-[#72767d]"
              />
              <SearchIcon className="h-6 mr-1 text-[#72767d] cursor-pointer" />
            </div>
            <InboxIcon className="icon mx-2" />
            <QuestionMarkCircleIcon className="icon mr-2" />
          </div>
        </header>

        <main className="flex-grow overflow-y-scroll scrollbar-hide hidden md:block">
          {messages?.docs.map((doc) => {
            const { message, timestamp, name, photoURL, email } = doc.data();
            return (
              <Message
                key={doc.id}
                id={doc.id}
                message={message}
                timestamp={timestamp}
                name={name}
                photoURL={photoURL}
                email={email}
              />
            );
          })}
          <div ref={chatRef} className="pb-16 " />
        </main>

        <div className="hidden md:flex items-center p-2.5 bg-[#40444b] mx-5 mb-7 rounded-lg">
          <PlusCircleIcon className="icon mr-4" />
          <form action="">
            <input
              type="text"
              disabled={!channelId}
              placeholder={
                channelId ? `Message #${channelName}` : "Select a Channel"
              }
              className="bg-transparent focus:outline-none text-[#dcddde] w-full placeholder-[#72767d] text-sm"
              ref={inputRef}
            />
            <button hidden type="submit" onClick={sendMessage}>
              Send
            </button>
          </form>
          <div className=" absolute right-7 hidden md:flex">
            <GiftIcon className="icon mr-2 " />
            <EmojiHappyIcon className="icon" />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error.message);
  }
}

export default Chat;
