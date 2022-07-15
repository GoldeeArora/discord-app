import React from "react";

function ServerIcon({ image }) {
  return (
    <img
      src={image}
      alt=""
      className="h-12 cursor-pointer rounded-full transition-all ease-out duration-100 hover:rounded-2xl"
    />
  );
}

export default ServerIcon;
