import React from "react";
import { DownloadIcon } from "@heroicons/react/outline";
function Hero() {
  return (
    <div className="bg-discord_blue pb-8  md:pb-0">
      <div className="p-7 py-9 h-screen md:flex relative ">
        <div className="flex flex-col gap-2 md:max-w-md lg:max-w-none lg:justify-center">
          <h1 className="text-5xl text-white font-bold">IMAGINE A PLACE...</h1>
          <h2 className="text-white text-lg font-light tracking-wide lg:max-w-3x1 w-full">
            ...where you can belong to a school club, a gaming group, or a
            worldwide art community. Where just you and a handful of friends can
            spend time together. A place that makes it easy to talk every day
            and hang out more often.
          </h2>
          <div className="flex flex-col sm:flex-row md:flex:col lg:flex-row md:items-start sm:items-center gap-6">
            <button className="bg-white w-63 font-medium flex rounded-full items-center justify-center p-4 text-lg hover:shadow-2x1 hover:text-discord_blurple focus:outline-none transition duration-200 ease-in-out md:font-normal lg:font-bold">
              <DownloadIcon className="w-6 mr-2" />
              Download for Mac
            </button>
            <button className="bg-gray-900 text-white w-75 md:w-80 font-medium flex rounded-full justify-center items-center p-4 text-lg hover:shadow-2xl hover-bg-gray-800 focus:outline-none transition duration-200 ease-in-out md:font-normal lg:font-bold">
              Open Discord in your browser
            </button>
          </div>
        </div>
        <div className="flex-grow">
          <img
            src="https://www.addictivetips.com/app/uploads/2021/05/Discord-TTS-not-working.jpg"
            alt=""
            className="my-14 sm:-left-36 md:hidden rounded-sm md:h-60"
          />
          <img
            src="https://techcrunch.com/wp-content/uploads/2020/11/discord1.jpg?w=990&crop=1"
            alt=""
            className="hidden md:inline relative  transform translate-x-5 -translate-y-20 lg:top-11 h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
