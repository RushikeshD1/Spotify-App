import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../context/userContext";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useSongData } from "../context/SongContext";
import axios from "axios";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const server = "http://13.53.174.55:3000";

const Admin = () => {
  const { user } = useUserData();
  const { albums, songs, fetchAlbums, fetchSongs } = useSongData();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [album, setAlbum] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const addAlbumHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    setBtnLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/api/v1/album/new`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      toast.success(data.message);
      fetchAlbums();
      setBtnLoading(false);

      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occured");
      setBtnLoading(false);
    }
  };

  const addSongHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("album", album)

    setBtnLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/api/v1/song/new`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      toast.success(data.message);
      fetchSongs();
      setBtnLoading(false);

      setTitle("");
      setDescription("");
      setFile(null);
      setAlbum("");

    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occured");
      setBtnLoading(false);
    }
  };

  const addThumbnailHandler = async (id: string) => {

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setBtnLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/api/v1/song/${id}`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      toast.success(data.message);
      fetchSongs();
      setBtnLoading(false);

      setFile(null);

    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occured");
      setBtnLoading(false);
    }
  };

  const deleteSong = async(id:string) => {
    if(confirm("Are you sure you want to delete this song")){
        setBtnLoading(true)

        try {
            const {data } = await axios.delete(`${server}/api/v1/song/${id}`, {
                headers:{
                    token: localStorage.getItem("token")
                }
            });

            toast.success(data.message || "Song deleted successfully");
            fetchSongs()
            setBtnLoading(false);
        } catch (error:any) {
            toast.error(error.response?.data?.message || "An error occured");
            setBtnLoading(false)
        }
    }
  }

  const deleteAlbum = async(id:string) => {
    if(confirm("Are you sure you want to delete this album")){
        setBtnLoading(true)

        try {
            const {data } = await axios.delete(`${server}/api/v1/album/${id}`, {
                headers:{
                    token: localStorage.getItem("token")
                }
            });

            toast.success(data.message || "Album deleted successfully");
            fetchSongs()
            fetchAlbums()
            setBtnLoading(false);
        } catch (error:any) {
            toast.error(error.response?.data?.message || "An error occured");
            setBtnLoading(false)
        }
    }
  }

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    setFile(selectedFile);
  };

  return (
    <div className="min-h-screen bg-[#212121] text-white p-8">
      <Link
        to={"/"}
        className="bg-green-500 text-white font-bold py-2 px-4 rounded-full"
      >
        Go to home page
      </Link>
      <h2 className="text-2xl font-bold mb-6 mt-6">Add Album</h2>
      <form onSubmit={addAlbumHandler} className="bg-[#181818] p-6 rounded-lg shadow-lg flex flex-col items-center justify-center gap-4">
        <input
          type="text"
          placeholder="Title"
          className="auth-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="auth-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          placeholder="Choose Thumbnail"
          className="auth-input"
          onChange={fileChangeHandler}
          accept="image/*"
          required
        />
        <button
          className="auth-btn"
          style={{ width: "100px" }}
          disabled={btnLoading}
        >
          {btnLoading ? "Please wait..." : "Add"}
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-6 mt-6">Add Song</h2>
      <form onSubmit={addSongHandler} className="bg-[#181818] p-6 rounded-lg shadow-lg flex flex-col items-center justify-center gap-4">
        <input
          type="text"
          placeholder="Title"
          className="auth-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="auth-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select className="auth-input" value={album} onChange={(e) => setAlbum(e.target.value)}>
            <option value="">Choose Album</option>
            {
                albums?.map((e:any, i:number) => {
                    return <option value={e.id} key={i}>{e.title}</option>
                })
            }
        </select>
        <input
          type="file"
          placeholder="Choose Audio"
          className="auth-input"
          onChange={fileChangeHandler}
          accept="audio/*"
          required
        />        
        <button
          className="auth-btn"
          style={{ width: "100px" }}
          disabled={btnLoading}
        >
          {btnLoading ? "Please wait..." : "Add"}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Added Albums</h3>
        <div className="flex justify-center md:justify-start gap-2 flex-wrap">
            {albums?.map((e:any, i:number) =>{
                return <div className="bg-[#181818] p-4 rounded-lg shadow-md" key={i}>
                    <img className="mr-1 w-52 h-52" src={e.thumbnail}/>
                    <h4 className="text-lg font-bold">{e.title.slice(0, 30)}...</h4>
                    <h4 className="text-lg font-bold">{e.description.slice(0, 20)}...</h4>
                    <button onClick={() => deleteAlbum(e.id)} className="px-3 py-1 bg-red-500 text-white rounded" disabled={btnLoading}><MdDelete /></button>
                </div>
                
            })}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Added Songs</h3>
        <div className="flex justify-center md:justify-start gap-2 flex-wrap">
            {songs?.map((e:any, i:number) =>{
                return <div className="bg-[#181818] p-4 rounded-lg shadow-md" key={i}>
                    {e.thumbnail ? <img className="mr-1 w-52 h-52" src={e.thumbnail}/> : (<div className="flex flex-col justify-center items-center gap-2">
                        <input type="file" onChange={fileChangeHandler}/>
                        <button onClick={() => addThumbnailHandler(e.id)} className="auth-btn" style={{width: "200px"}} disabled={btnLoading}>{btnLoading ? "Please wait...": "Add Thumbnail"}</button>
                    </div>)}
                    
                    <h4 className="text-lg font-bold">{e.title.slice(0, 30)}...</h4>
                    <h4 className="text-lg font-bold">{e.description.slice(0, 20)}...</h4>
                    <button onClick={() => deleteSong(e.id)} className="px-3 py-1 bg-red-500 text-white rounded" disabled={btnLoading}><MdDelete /></button>
                </div>
            })}
        </div>
      </div>
      
    </div>
  );
};

export default Admin;
