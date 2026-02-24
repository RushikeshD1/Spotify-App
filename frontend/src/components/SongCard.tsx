import React from "react";
import { FaBookmark, FaPlay } from "react-icons/fa";
import { useUserData } from "../context/userContext";
import { useSongData } from "../context/SongContext";

interface SongCardProps {
  image: string;
  name: string;
  id: string;
  description: string;
}

const SongCard: React.FC<SongCardProps> = ({
  image,
  name,
  description,
  id,
}) => {
  const { addToPlayList, isAuth } = useUserData();
  const { setSelectedSong, setIsPlaying } = useSongData();

  const saveToPlayListHandler = () => {
    addToPlayList(id);
  };
  return (
    <div className="min-w-45 px-3 p-2 rounded cursor-pointer hover:bg-[#ffffff26]">
      <div className="relative group">
        <img
          src={image ? image : "/image.webp"}
          className="mr-1 w-40 rounded"
          alt={name}
        />
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedSong(id);
              setIsPlaying(true);
            }}
            className="absolute bottom-2 right-14 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <FaPlay />
          </button>
          {isAuth && (
            <button
              onClick={saveToPlayListHandler}
              className="absolute bottom-2 right-2 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <FaBookmark />
            </button>
          )}
        </div>
      </div>
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{description.slice(0, 20)}...</p>
    </div>
  );
};

export default SongCard;
