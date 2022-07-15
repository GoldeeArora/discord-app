import { HashtagIcon } from "@heroicons/react/solid";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setChannelInfo } from "../features/channelSlice";
function Channel({ id, channelName }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setChannel = () => {
    dispatch(
      setChannelInfo({
        channelId: id,
        channelName: channelName,
      })
    );
    navigate(`/channels:${id}`);
  };
  return (
    <div
      className="flex items-center cursor-pointer font-medium hover:text-white rounded-md p-1 hover:bg-[#3A3C43]"
      onClick={setChannel}
    >
      <HashtagIcon className="h-5 mr-2 " />
      {channelName}
    </div>
  );
}

export default Channel;
