import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MomentTimeDisplay from "../utils/dateFormatted";

type BlogData = {
  createdAt: any;
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
      className="md:w-[33%] w-full h-full p-2 rounded-lg hover:shadow-lg cursor-pointer hover:bg-gray-700 hover:text-white/80"
      onClick={() => navigate(`/news/${item.id}`)}
    >
      <img
        className="w-full h-[20vh] object-cover rounded-md"
        src={item.photoURL}
      />
      <div>
        <div className="flex justify-around items-center pt-5 pb-2">
          <Avatar
            className="text-white"
            aria-hashpopup="true"
            sx={{
              bgcolor: "#ffee58",
              color: "white",
              width: 20,
              height: 20,
              cursor: "pointer",
            }}
          >
            {item.category[0].toUpperCase()}
          </Avatar>
          <p className="text-[15px] font-normal">{item.category} News</p>
          <span className="text-black/30">
            {item.createdAt ? (
              <MomentTimeDisplay timestamp={item.createdAt} />
            ) : null}
          </span>
        </div>
        <h2 className="font-[500] line-clamp-2 text-[15px] hover:text-yellow-600 hover:font-bold cursor-pointer">
          {item.heading}
        </h2>
        <p className="mt-2 hover:text-white/60 text-[12px] line-clamp-2">
          {item.mainbody}
        </p>
        <p className="text-yellow-500 font-normal text-[13px] flex gap-2">
          {item.category}{" "}
          <span className="text-[13px] text-black/300 font-light">-</span>{" "}
          {item.createdAt ? (
            <MomentTimeDisplay timestamp={item.createdAt} />
          ) : null}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
