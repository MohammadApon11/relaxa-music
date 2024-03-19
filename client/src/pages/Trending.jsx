import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import { motion } from "framer-motion";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import StaticSideBar from "./StaticSideBar";
import { baseURL } from "../api";

const Trending = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}api/songs/getAll`
        );
        setData(response?.data?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-12 min-h-[100vh]">
      <div className="col-span-2 border-r border-white">
        <StaticSideBar />
      </div>
      <div className="col-span-10">
        <SideBar />
        <div className="w-full h-auto flex items-center justify-evenly gap-4 flex-wrap p-4">
          <TrendingSongContainer musics={data} />
        </div>
      </div>
    </div>
  );
};

export const TrendingSongContainer = ({ musics }) => {
  const [{ isSongPlaying, song }, dispatch] = useStateValue();

  const addSongToContext = (index) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }

    if (song !== index) {
      dispatch({
        type: actionType.SET_SONG,
        song: index,
      });
    }
  };
  return (
    <>
      {musics?.map(
        (data, index) =>
          data.trending === true && (
            <motion.div
              key={data?._id}
              whileTap={{ scale: 0.8 }}
              initial={{ opacity: 0, translateX: -50 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
              onClick={() => addSongToContext(index)}
            >
              <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={data.imageURL}
                  alt=""
                  className=" w-full h-full rounded-lg object-cover"
                />
              </div>

              <p className="text-base text-headingColor font-semibold my-2">
                {data.name.length > 25
                  ? `${data.name.slice(0, 25)}`
                  : data.name}
                <span className="block text-sm text-gray-400 my-1">
                  {data?.artist}
                </span>
              </p>
            </motion.div>
          )
      )}
    </>
  );
};

export default Trending;
