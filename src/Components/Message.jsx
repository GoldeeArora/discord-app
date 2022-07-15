import React from "react";
import moment from "moment";
import { TrashIcon } from "@heroicons/react/outline";
import { db, auth } from "../firebase";
import { useSelector } from "react-redux/es/exports";
import { selectChannelId } from "../features/channelSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, deleteDoc } from "firebase/firestore";
function Message({ id, message, timestamp, name, photoURL, email }) {
  const channelId = useSelector(selectChannelId);
  const [user] = useAuthState(auth);
  return (
    <div className="flex items-center p-1 pl-5 my-5 mr-2 hover:bg-[#32353b] group">
      <img
        src={photoURL}
        alt=""
        className="rounded-full h-10 cursor-pointer shadow-2xl"
      />
      <div className="flex flex-col">
        <h4 className="flex items-center space-x-2 font-medium">
          <span className="hover:underline text-white text-sm cursor-pointer">
            {name}
          </span>
          <span className="text-[#72767d] text-xs">
            {moment(timestamp?.toDate().getTime()).format("lll")}
          </span>
        </h4>
        <p className="text-sm text-[#dcdde] ">{message}</p>
      </div>
      {user?.email === email && (
        <div
          className="hover:bg-[#ed4245] p-1 ml-auto rounded-sm text-[#ed4245] hover:text-white cursor-pointer"
          onClick={() => {
            deleteDoc(doc(doc(db, "channels", channelId), "messages", id));
          }}
        >
          <TrashIcon className="h-5 hidden group-hover:inline" />
        </div>
      )}
    </div>
  );
}

export default Message;
