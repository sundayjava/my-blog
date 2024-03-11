import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

type BlogData = {
  id: string;
  category: string;
  heading: string;
  mainbody: string;
  middlehead: string;
  photoURL: string;
  subheading: string;
};

const NewsCard = (props: { item: BlogData }) => {
  const { item } = props;
  const navigate = useNavigate();
  return (
    <div
      className="md:w-[33%] w-full h-full p-2 rounded-lg hover:shadow-lg cursor-pointer hover:bg-yellow-50"
      onClick={() => navigate(`/news/${item.id}`)}
    >
      <img
        className="w-full h-[50%] object-cover rounded-md"
        src={item.photoURL}
      />
      <div>
        <div className="flex justify-around items-center pt-5 pb-2">
          <Avatar
            className="text-white"
            aria-hashpopup="true"
            sx={{
              bgcolor: deepPurple[500],
              color: "white",
              width: 20,
              height: 20,
              cursor: "pointer",
            }}
          >
            {item.category[0].toUpperCase()}
          </Avatar>
          <p className="text-[15px] font-normal">CNN News</p>
          <span className="text-black/30">10 hours ago</span>
        </div>
        <h2 className="font-[500] text-[15px] hover:text-yellow-600 hover:font-bold cursor-pointer">
          Russia attacked strong Ukrainian positions using Chinese golf carts
        </h2>
        <p className="mt-2 text-black/50 text-[12px]">
          Russia attacked strong Ukrainian positions using Chinese golf carts
          The Russian Armed Forces used Chinese golf carts to storm Ukrainian
          positions on the frontlines near Lyman. However, the attack did not go
          well according to a video released by the military unit that fended
          off the assault.
        </p>
        <p className="text-yellow-500 font-normal text-[13px]">
          Sport <span className="text-[13px] text-black/300 font-light">-</span>{" "}
          <span className="text-[13px] text-black/300 font-light">
            1 min ago
          </span>
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
