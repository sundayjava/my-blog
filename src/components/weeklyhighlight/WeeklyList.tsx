import { NavigateNext } from "@mui/icons-material";
import WeeklyCard from "./WeeklyCard";
import { useNavigate } from "react-router-dom";

type BlogData = {
  id: string;
  createdAt: string;
  category: string;
  heading: string;
  mainbody: string;
  middlehead: string;
  photoURL: string;
  subheading: string;
};

const WeeklyList = (props: { item: BlogData[] }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full mt-2 px-5 bg-gray-800 text-white/75">
      <div className="flex justify-between items-center py-8">
        <h1 className="text-[17px] font-[500] text-white">Weekly Highlight</h1>
        <span
          className="text-yellow-500 cursor-pointer"
          onClick={() => navigate("/specific/Weekly_Highlight")}
        >
          See all <NavigateNext />
        </span>
      </div>
      <div className="flex gap-5 lg:flex-row flex-col">
        {props.item.slice(0, 3).map((items) => (
          <WeeklyCard key={items.id} item={items} />
        ))}
      </div>
    </div>
  );
};

export default WeeklyList;
