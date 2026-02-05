import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-between items-center font-semibold">
      <div className="flex items-center gap-2">
        <img
          src="/left_arrow.png"
          className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
          onClick={() => navigate(-1)}
          alt="left arrow image"
        />
        <img
          src="/right_arrow.png"
          className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
          onClick={() => navigate(-1)}
          alt="right arrow image"
        />
      </div>
    </div>
  );
};

export default Navbar;
