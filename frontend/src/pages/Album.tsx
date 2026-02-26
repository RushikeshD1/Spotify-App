import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useSongData } from "../context/SongContext";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { FaBookmark, FaPlay } from "react-icons/fa";
import { useUserData } from "../context/userContext";

const Album = () => {
  const {
    albumData,
    albumSong,
    fetchAlbumSongs,
    setIsPlaying,
    setSelectedSong,
    loading,
  } = useSongData();

  const params = useParams<{ id: string }>();

  const {isAuth, addToPlayList} = useUserData()

  useEffect(() => {
    if (params.id) {
      fetchAlbumSongs(params.id);
    }
  }, [params.id]);

  return (
    <div>
    <Layout>
      {albumData && (
        <>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="mt-10 flex gap-8 flex-column md:flex-row md:items-center">
                {albumData.thumbnail && (
                  <img
                    src={albumData.thumbnail}
                    alt={albumData.title}
                    className="w-48 rounded"
                  />
                )}

                <div className="flex flex-col">
                    <p>PlayList</p>
                    <h2 className="text-3xl font-bold mb-4 md:text-5xl">{albumData.title} PlayList</h2>
                    <h4 className="">{albumData.description}</h4>
                    <p className="mt-1">
                        <span className="font-bold text-green-600">SoundNode</span>
                    </p>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
                <p>
                    <b className="mr-4">#</b>
                </p>
                <p className="hidden sm:block text-center">
                    Description
                </p>
                <p>Actions</p>
              </div>

              <hr/>

              {
                albumSong && albumSong.map((song, i) => {
                    return <div key={i} className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer">
                        <p className="text-white ">
                            <b className="mr-4 text-[#a7a7a7]">{i+1}</b>
                            <img className="inline w-10 mr-5" src={song.thumbnail ? song.thumbnail : "/image.webp"} alt="" />{" "}
                            {song.title}
                        </p>
                        <p className="text-[15px] hidden sm:block">{song.description.slice(0, 30)}...</p>
                        <p className="flex justify-center items-center gap-5">
                            {isAuth && <button onClick={() => {
                                addToPlayList(song.id);
                            }}  className="text-[15px] text-center cursor-pointer"><FaBookmark/></button>}
                            <button onClick={() => {
                                setSelectedSong(song.id);
                                setIsPlaying(true)
                            }} className="text-[15px] text-center cursor-pointer"><FaPlay/></button>
                        </p>
                    </div>
                })
              }
            </>
          )}
        </>
      )}
    </Layout>
    </div>
  );
};

export default Album;
